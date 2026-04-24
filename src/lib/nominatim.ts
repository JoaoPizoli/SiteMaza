import { getDemoCepCoordinates, normalizeCep, type GeoPoint } from "@/lib/store-locator";

interface NominatimPlace {
  lat: string;
  lon: string;
  display_name?: string;
}

export interface GeocodedCep {
  coordinates: GeoPoint;
  label: string;
  source: "nominatim" | "demo";
}

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const REQUEST_TIMEOUT_MS = 8000;

function parsePlace(place: NominatimPlace | undefined): GeocodedCep | null {
  if (!place) {
    return null;
  }

  const lat = Number(place.lat);
  const lng = Number(place.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    coordinates: { lat, lng },
    label: place.display_name ?? "Localização encontrada",
    source: "nominatim",
  };
}

async function requestNominatim(params: URLSearchParams, signal?: AbortSignal) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abort = () => controller.abort();

  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(`${NOMINATIM_ENDPOINT}?${params.toString()}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Não foi possível consultar o CEP agora.");
    }

    return (await response.json()) as NominatimPlace[];
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abort);
  }
}

export async function geocodeCepWithNominatim(
  cep: string,
  signal?: AbortSignal,
): Promise<GeocodedCep> {
  const normalizedCep = normalizeCep(cep);
  const demoCoordinates = getDemoCepCoordinates(normalizedCep);

  try {
    const postalCodeParams = new URLSearchParams({
      format: "jsonv2",
      countrycodes: "br",
      postalcode: normalizedCep,
      addressdetails: "1",
      limit: "1",
      "accept-language": "pt-BR",
    });

    const postalCodeMatch = parsePlace((await requestNominatim(postalCodeParams, signal))[0]);

    if (postalCodeMatch) {
      return postalCodeMatch;
    }

    const queryParams = new URLSearchParams({
      format: "jsonv2",
      countrycodes: "br",
      q: `${normalizedCep}, Brasil`,
      addressdetails: "1",
      limit: "1",
      "accept-language": "pt-BR",
    });

    const queryMatch = parsePlace((await requestNominatim(queryParams, signal))[0]);

    if (queryMatch) {
      return queryMatch;
    }
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }
  }

  if (demoCoordinates) {
    return {
      coordinates: demoCoordinates,
      label: "CEP de demonstração",
      source: "demo",
    };
  }

  throw new Error("Não encontramos esse CEP. Confira os números e tente novamente.");
}
