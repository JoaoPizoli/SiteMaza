export { BRAZIL_UFS } from "./api-config";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface StoreLocation {
  id: string;
  codcli?: string;
  name: string;
  address: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode?: string;
  email?: string;
  phone?: string;
  representativeCode?: string;
  representativeName?: string;
  coordinates: GeoPoint;
}

export interface StoreWithDistance extends StoreLocation {
  distanceKm?: number;
}

export interface RepresentativeLocation {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export const MOCK_STORES: StoreLocation[] = [
  {
    id: "maza-mococa-centro",
    name: "Maza Tintas - Mococa Centro",
    address: "Rua Capitao Miguel Ferreira, 105",
    city: "Mococa",
    state: "SP",
    phone: "(19) 3656-1234",
    coordinates: { lat: -21.4678, lng: -47.0044 },
  },
  {
    id: "maza-ribeirao-preto",
    name: "Revenda Maza - Ribeirão Preto",
    address: "Av. Presidente Vargas, 1472",
    city: "Ribeirão Preto",
    state: "SP",
    phone: "(16) 3620-9988",
    coordinates: { lat: -21.1843, lng: -47.8062 },
  },
  {
    id: "maza-franca",
    name: "Revenda Maza - Franca",
    address: "Av. Brasil, 2500",
    city: "Franca",
    state: "SP",
    phone: "(16) 3700-1122",
    coordinates: { lat: -20.5396, lng: -47.4019 },
  },
  {
    id: "maza-campinas",
    name: "Distribuidor Maza - Campinas",
    address: "Av. Orosimbo Maia, 960",
    city: "Campinas",
    state: "SP",
    phone: "(19) 3252-4400",
    coordinates: { lat: -22.9056, lng: -47.0608 },
  },
  {
    id: "maza-sao-paulo",
    name: "Parceiro Maza - São Paulo",
    address: "Rua Vergueiro, 2045",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 3208-7711",
    coordinates: { lat: -23.5747, lng: -46.6355 },
  },
  {
    id: "maza-belo-horizonte",
    name: "Distribuidor Maza - Belo Horizonte",
    address: "Av. Afonso Pena, 1500",
    city: "Belo Horizonte",
    state: "MG",
    phone: "(31) 3333-5566",
    coordinates: { lat: -19.9208, lng: -43.9378 },
  },
  {
    id: "maza-pocos-caldas",
    name: "Representante Maza - Poços de Caldas",
    address: "Rua Prefeito Chagas, 305",
    city: "Poços de Caldas",
    state: "MG",
    phone: "(35) 3722-9090",
    coordinates: { lat: -21.7854, lng: -46.5614 },
  },
  {
    id: "maza-curitiba",
    name: "Revenda Maza - Curitiba",
    address: "Rua XV de Novembro, 621",
    city: "Curitiba",
    state: "PR",
    phone: "(41) 3015-8844",
    coordinates: { lat: -25.4284, lng: -49.2733 },
  },
  {
    id: "maza-rio-de-janeiro",
    name: "Parceiro Maza - Rio de Janeiro",
    address: "Rua da Assembleia, 77",
    city: "Rio de Janeiro",
    state: "RJ",
    phone: "(21) 2509-7755",
    coordinates: { lat: -22.9068, lng: -43.1729 },
  },
];

type ApiCollectionResponse<T> = T[] | { data: T[] };

function readApiCollection<T>(payload: ApiCollectionResponse<T>) {
  return Array.isArray(payload) ? payload : payload.data;
}

async function fetchApiCollection<T>(url: string, signal?: AbortSignal): Promise<T[]> {
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ApiCollectionResponse<T>;
  const collection = readApiCollection(payload);

  return Array.isArray(collection) ? collection : [];
}

export async function fetchRepresentativeCitiesByUf(uf: string, signal?: AbortSignal) {
  const normalizedUf = uf.trim().toUpperCase();
  if (!normalizedUf) {
    return [] as string[];
  }

  return fetchApiCollection<string>(
    `/api/representantes/cidades?uf=${encodeURIComponent(normalizedUf)}`,
    signal,
  );
}

export async function fetchRepresentativesByCity(city: string, signal?: AbortSignal) {
  const normalizedCity = city.trim();
  if (!normalizedCity) {
    return [] as RepresentativeLocation[];
  }

  return fetchApiCollection<RepresentativeLocation>(
    `/api/representantes?city=${encodeURIComponent(normalizedCity)}`,
    signal,
  );
}

export async function fetchStores(signal?: AbortSignal) {
  return fetchApiCollection<StoreWithDistance>("/api/lojas?limit=6", signal);
}

export async function fetchNearbyStores(
  origin: GeoPoint,
  options: { signal?: AbortSignal; limit?: number; radiusKm?: number } = {},
) {
  const params = new URLSearchParams({
    lat: String(origin.lat),
    lng: String(origin.lng),
    limit: String(options.limit ?? 6),
  });

  if (options.radiusKm) {
    params.set("raioKm", String(options.radiusKm));
  }

  return fetchApiCollection<StoreWithDistance>(
    `/api/lojas/proximas?${params.toString()}`,
    options.signal,
  );
}

export const BRAZIL_CENTER: GeoPoint = { lat: -15.7801, lng: -47.9292 };

export const DEMO_CEPS: Array<{ label: string; cep: string }> = [
  { label: "Mococa", cep: "13730-000" },
  { label: "São Paulo", cep: "01310-100" },
  { label: "Belo Horizonte", cep: "30130-010" },
  { label: "Curitiba", cep: "80010-000" },
];

export function normalizeCep(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

export function formatCep(value: string) {
  const digits = normalizeCep(value);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function isValidCep(value: string) {
  return normalizeCep(value).length === 8;
}

export function calculateDistanceKm(origin: GeoPoint, destination: GeoPoint) {
  const earthRadiusKm = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latDistance = toRadians(destination.lat - origin.lat);
  const lngDistance = toRadians(destination.lng - origin.lng);
  const originLat = toRadians(origin.lat);
  const destinationLat = toRadians(destination.lat);
  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(originLat) *
      Math.cos(destinationLat) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function getStoresByDistance(origin: GeoPoint, stores = MOCK_STORES): StoreWithDistance[] {
  return stores
    .map((store) => ({
      ...store,
      distanceKm: calculateDistanceKm(origin, store.coordinates),
    }))
    .sort((left, right) => (left.distanceKm ?? 0) - (right.distanceKm ?? 0));
}

export function formatDistance(distanceKm?: number) {
  if (typeof distanceKm !== "number") {
    return "Distância será calculada pelo CEP";
  }

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }

  return `${distanceKm.toLocaleString("pt-BR", {
    maximumFractionDigits: distanceKm < 100 ? 1 : 0,
  })} km`;
}
