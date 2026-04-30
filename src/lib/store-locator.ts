import distance from "@turf/distance";
import { point } from "@turf/helpers";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
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
  serviceCities: string[];
}

export interface RepresentativeRegion {
  state: string;
  cities: string[];
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

export const MOCK_REPRESENTATIVES: RepresentativeLocation[] = [
  {
    name: "Ricardo S. Farini",
    company: "Farini Representação Comercial Ltda.",
    email: "diretoria@amazonfortimp.com.br",
    phone: "(19) 99159-4165",
    serviceCities: ["Poços de Caldas", "Andradas", "Varginha", "Pouso Alegre"],
  },
  {
    name: "Mariana Costa",
    company: "Distribuidora MG Representações",
    email: "comercial@distribuidoramg.com.br",
    phone: "(31) 3333-5566",
    serviceCities: ["Belo Horizonte", "Contagem", "Betim", "Nova Lima"],
  },
  {
    name: "Paulo Henrique Martins",
    company: "PHM Representações",
    email: "paulo.martins@tintasmaza.com.br",
    phone: "(19) 3656-2210",
    serviceCities: ["Mococa", "Casa Branca", "São José do Rio Pardo", "Cajuru"],
  },
  {
    name: "Camila Rocha",
    company: "Rocha Soluções Comerciais",
    email: "ribeirao.representante@tintasmaza.com.br",
    phone: "(16) 3620-9090",
    serviceCities: ["Ribeirão Preto", "Sertãozinho", "Jaboticabal", "Bebedouro"],
  },
  {
    name: "Eduardo Nunes",
    company: "Nunes Trade Representações",
    email: "sp.representante@tintasmaza.com.br",
    phone: "(11) 3208-7711",
    serviceCities: ["São Paulo", "Guarulhos", "Osasco", "ABC Paulista"],
  },
  {
    name: "Luiza Almeida",
    company: "Almeida Comercial",
    email: "curitiba.representante@tintasmaza.com.br",
    phone: "(41) 3015-8844",
    serviceCities: ["Curitiba", "São José dos Pinhais", "Colombo", "Pinhais"],
  },
  {
    name: "Fernanda Lopes",
    company: "Lopes Representações RJ",
    email: "rio.representante@tintasmaza.com.br",
    phone: "(21) 2509-7755",
    serviceCities: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu"],
  },
];

export const MOCK_REPRESENTATIVE_REGIONS: RepresentativeRegion[] = [
  { state: "MG", cities: ["Andradas", "Belo Horizonte", "Betim", "Contagem", "Nova Lima", "Poços de Caldas", "Pouso Alegre", "Varginha"] },
  { state: "PR", cities: ["Colombo", "Curitiba", "Pinhais", "São José dos Pinhais"] },
  { state: "RJ", cities: ["Duque de Caxias", "Niterói", "Nova Iguaçu", "Rio de Janeiro"] },
  { state: "SP", cities: ["ABC Paulista", "Bebedouro", "Cajuru", "Casa Branca", "Guarulhos", "Jaboticabal", "Mococa", "Osasco", "Ribeirão Preto", "São José do Rio Pardo", "São Paulo", "Sertãozinho"] },
];

type ApiCollectionResponse<T> = T[] | { data: T[] };

function readApiCollection<T>(payload: ApiCollectionResponse<T>) {
  return Array.isArray(payload) ? payload : payload.data;
}

async function fetchApiCollection<T>(url: string, signal?: AbortSignal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ApiCollectionResponse<T>;
  return readApiCollection(payload);
}

export async function fetchRepresentativeStates(signal?: AbortSignal) {
  return fetchApiCollection<string>("/api/representantes/estados", signal);
}

export async function fetchRepresentativeCitiesByState(state: string, signal?: AbortSignal) {
  const query = state ? `?state=${encodeURIComponent(state)}` : "";

  return fetchApiCollection<string>(`/api/representantes/cidades${query}`, signal);
}

export async function fetchRepresentativesByLocation(state: string, city: string, signal?: AbortSignal) {
  const params = new URLSearchParams();

  if (state) {
    params.set("state", state);
  }

  if (city) {
    params.set("city", city);
  }

  const query = params.toString() ? `?${params.toString()}` : "";

  return fetchApiCollection<RepresentativeLocation>(`/api/representantes${query}`, signal);
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
  return distance(
    point([origin.lng, origin.lat]),
    point([destination.lng, destination.lat]),
    { units: "kilometers" },
  );
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

export function getRepresentativeStates() {
  return MOCK_REPRESENTATIVE_REGIONS.map((region) => region.state).sort();
}

export function getRepresentativeCities(state: string) {
  const region = MOCK_REPRESENTATIVE_REGIONS.find((item) => item.state === state);

  return [...(region?.cities ?? [])].sort((left, right) => left.localeCompare(right, "pt-BR"));
}

export function getRepresentativesByLocation(state: string, city: string) {
  const stateCities = new Set(getRepresentativeCities(state));

  return MOCK_REPRESENTATIVES.filter((representative) => {
    if (city) {
      return representative.serviceCities.includes(city);
    }

    if (state) {
      return representative.serviceCities.some((serviceCity) => stateCities.has(serviceCity));
    }

    return true;
  });
}
