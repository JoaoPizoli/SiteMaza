import { normalizeCep, type GeoPoint } from "@/lib/store-locator";

/* ── Types ─────────────────────────────────────────────────────────── */

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

interface NominatimPlace {
  lat: string;
  lon: string;
  display_name?: string;
}

export interface GeocodedCep {
  coordinates: GeoPoint;
  label: string;
  source: "viacep+nominatim" | "nominatim";
}

/* ── Constants ─────────────────────────────────────────────────────── */

const VIACEP_ENDPOINT = "https://viacep.com.br/ws";
const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const REQUEST_TIMEOUT_MS = 10_000;

/* ── Helpers ───────────────────────────────────────────────────────── */

function parsePlace(place: NominatimPlace | undefined, label: string, source: GeocodedCep["source"]): GeocodedCep | null {
  if (!place) return null;

  const lat = Number(place.lat);
  const lng = Number(place.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return {
    coordinates: { lat, lng },
    label,
    source,
  };
}

/**
 * Creates a fetch call with an automatic timeout and external abort
 * signal support.
 */
async function fetchWithTimeout(url: string, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abort = () => controller.abort();

  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abort);
  }
}

/* ── Step 1 — ViaCEP ───────────────────────────────────────────────── */

/**
 * Queries the ViaCEP API to resolve a CEP into a structured address.
 * Returns `null` when the CEP is not found.
 */
async function fetchViaCep(cep: string, signal?: AbortSignal): Promise<ViaCepResponse | null> {
  try {
    const response = await fetchWithTimeout(`${VIACEP_ENDPOINT}/${cep}/json/`, signal);
    const data = (await response.json()) as ViaCepResponse;

    if (data.erro) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Builds a human-readable label from a ViaCEP response.
 */
function buildViaCepLabel(viacep: ViaCepResponse): string {
  const parts: string[] = [];

  if (viacep.logradouro) parts.push(viacep.logradouro);
  if (viacep.bairro) parts.push(viacep.bairro);
  if (viacep.localidade) parts.push(viacep.localidade);
  if (viacep.uf) parts.push(viacep.uf);

  return parts.join(", ") || "Localização encontrada";
}

/* ── Step 2 — Nominatim geocoding ──────────────────────────────────── */

/**
 * Uses a structured ViaCEP address to query Nominatim for lat/lng.
 * It tries a specific query first (street + city + state), then falls
 * back to city + state only.
 */
async function geocodeWithNominatim(viacep: ViaCepResponse, signal?: AbortSignal): Promise<GeocodedCep | null> {
  const label = buildViaCepLabel(viacep);

  // Attempt 1: specific street + city + state
  if (viacep.logradouro) {
    const specificQuery = [viacep.logradouro, viacep.localidade, viacep.uf, "Brasil"].join(", ");
    const specificParams = new URLSearchParams({
      format: "jsonv2",
      countrycodes: "br",
      q: specificQuery,
      limit: "1",
      "accept-language": "pt-BR",
    });

    try {
      const response = await fetchWithTimeout(`${NOMINATIM_ENDPOINT}?${specificParams.toString()}`, signal);
      const places = (await response.json()) as NominatimPlace[];
      const result = parsePlace(places[0], label, "viacep+nominatim");
      if (result) return result;
    } catch {
      // fall through to next attempt
    }
  }

  // Attempt 2: city + state (broader, but still accurate to the municipality)
  const broadQuery = [viacep.localidade, viacep.uf, "Brasil"].join(", ");
  const broadParams = new URLSearchParams({
    format: "jsonv2",
    countrycodes: "br",
    q: broadQuery,
    limit: "1",
    "accept-language": "pt-BR",
  });

  try {
    const response = await fetchWithTimeout(`${NOMINATIM_ENDPOINT}?${broadParams.toString()}`, signal);
    const places = (await response.json()) as NominatimPlace[];
    const result = parsePlace(places[0], label, "viacep+nominatim");
    if (result) return result;
  } catch {
    // fall through
  }

  return null;
}

/**
 * Fallback: query Nominatim directly with the raw CEP digits.
 */
async function geocodeCepDirectly(cep: string, signal?: AbortSignal): Promise<GeocodedCep | null> {
  const params = new URLSearchParams({
    format: "jsonv2",
    countrycodes: "br",
    postalcode: cep,
    limit: "1",
    "accept-language": "pt-BR",
  });

  try {
    const response = await fetchWithTimeout(`${NOMINATIM_ENDPOINT}?${params.toString()}`, signal);
    const places = (await response.json()) as NominatimPlace[];
    return parsePlace(places[0], places[0]?.display_name ?? "Localização encontrada", "nominatim");
  } catch {
    return null;
  }
}

/* ── Main entry-point ──────────────────────────────────────────────── */

/**
 * Resolves a Brazilian CEP to geographic coordinates using:
 *
 * 1. **ViaCEP** → structured address (street, city, state)
 * 2. **Nominatim** → geocodes the structured address into lat/lng
 * 3. **Fallback** → tries Nominatim directly with the raw CEP
 *
 * Throws when the CEP cannot be resolved by any method.
 */
export async function geocodeCepWithNominatim(
  cep: string,
  signal?: AbortSignal,
): Promise<GeocodedCep> {
  const normalizedCep = normalizeCep(cep);

  // ── Primary path: ViaCEP → Nominatim ──────────────────────────────
  const viacep = await fetchViaCep(normalizedCep, signal);

  if (viacep) {
    const geocoded = await geocodeWithNominatim(viacep, signal);

    if (geocoded) return geocoded;
  }

  // ── Fallback: raw CEP → Nominatim ────────────────────────────────
  const directResult = await geocodeCepDirectly(normalizedCep, signal);

  if (directResult) return directResult;

  throw new Error("Não encontramos esse CEP. Confira os números e tente novamente.");
}
