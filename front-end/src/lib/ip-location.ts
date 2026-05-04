import type { GeoPoint } from "@/lib/store-locator";

type CoordinateValue = number | string | null | undefined;

interface IpApiResponse {
  latitude?: CoordinateValue;
  longitude?: CoordinateValue;
  city?: string;
  region?: string;
  country_name?: string;
  error?: boolean;
  reason?: string;
}

interface IpWhoIsResponse {
  success?: boolean;
  latitude?: CoordinateValue;
  longitude?: CoordinateValue;
  city?: string;
  region?: string;
  country?: string;
  message?: string;
}

export interface IpGeolocation {
  coordinates: GeoPoint;
  label: string;
  source: "ipapi" | "ipwhois";
}

const REQUEST_TIMEOUT_MS = 5_000;

function toCoordinate(value: CoordinateValue) {
  const coordinate = typeof value === "string" ? Number(value) : value;

  return typeof coordinate === "number" && Number.isFinite(coordinate) ? coordinate : null;
}

function buildLabel(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(", ") || "Localização aproximada";
}

function parseLocation(
  latValue: CoordinateValue,
  lngValue: CoordinateValue,
  label: string,
  source: IpGeolocation["source"],
): IpGeolocation | null {
  const lat = toCoordinate(latValue);
  const lng = toCoordinate(lngValue);

  if (lat === null || lng === null) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return {
    coordinates: { lat, lng },
    label,
    source,
  };
}

async function fetchJsonWithTimeout<T>(url: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abort = () => controller.abort();

  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    globalThis.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abort);
  }
}

async function geolocateWithIpApi(signal?: AbortSignal): Promise<IpGeolocation> {
  const data = await fetchJsonWithTimeout<IpApiResponse>("https://ipapi.co/json/", signal);

  if (data.error) {
    throw new Error(data.reason || "Não foi possível localizar o IP.");
  }

  const location = parseLocation(
    data.latitude,
    data.longitude,
    buildLabel(data.city, data.region, data.country_name),
    "ipapi",
  );

  if (!location) {
    throw new Error("A localização por IP não retornou coordenadas válidas.");
  }

  return location;
}

async function geolocateWithIpWhoIs(signal?: AbortSignal): Promise<IpGeolocation> {
  const data = await fetchJsonWithTimeout<IpWhoIsResponse>("https://ipwho.is/", signal);

  if (data.success === false) {
    throw new Error(data.message || "Não foi possível localizar o IP.");
  }

  const location = parseLocation(
    data.latitude,
    data.longitude,
    buildLabel(data.city, data.region, data.country),
    "ipwhois",
  );

  if (!location) {
    throw new Error("A localização por IP não retornou coordenadas válidas.");
  }

  return location;
}

export async function geolocateByIp(signal?: AbortSignal): Promise<IpGeolocation> {
  const providers = [geolocateWithIpApi, geolocateWithIpWhoIs];
  let lastError: unknown;

  for (const provider of providers) {
    try {
      return await provider(signal);
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }

      lastError = error;
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Não foi possível localizar sua região pelo IP.");
}
