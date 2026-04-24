import distance from "@turf/distance";
import { point } from "@turf/helpers";

export type StoreChannel = "revenda" | "showroom" | "distribuidor";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  channel: StoreChannel;
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  coordinates: GeoPoint;
}

export interface StoreWithDistance extends StoreLocation {
  distanceKm?: number;
}

export interface RepresentativeLocation {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  state: string;
  city: string;
  address: string;
  serviceCities: string[];
  productLines: string[];
}

export const MOCK_STORES: StoreLocation[] = [
  {
    id: "maza-mococa-centro",
    name: "Maza Tintas - Mococa Centro",
    channel: "showroom",
    address: "Rua Capitao Miguel Ferreira, 105",
    city: "Mococa",
    state: "SP",
    cep: "13730-000",
    phone: "(19) 3656-1234",
    whatsapp: "551936561234",
    email: "mococa@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -21.4678, lng: -47.0044 },
  },
  {
    id: "maza-ribeirao-preto",
    name: "Revenda Maza - Ribeirão Preto",
    channel: "revenda",
    address: "Av. Presidente Vargas, 1472",
    city: "Ribeirão Preto",
    state: "SP",
    cep: "14020-260",
    phone: "(16) 3620-9988",
    whatsapp: "551636209988",
    email: "ribeirao@tintasmaza.com.br",
    hours: "Seg a sáb, 8h às 18h",
    coordinates: { lat: -21.1843, lng: -47.8062 },
  },
  {
    id: "maza-franca",
    name: "Revenda Maza - Franca",
    channel: "revenda",
    address: "Av. Brasil, 2500",
    city: "Franca",
    state: "SP",
    cep: "14401-234",
    phone: "(16) 3700-1122",
    whatsapp: "551637001122",
    email: "franca@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -20.5396, lng: -47.4019 },
  },
  {
    id: "maza-campinas",
    name: "Distribuidor Maza - Campinas",
    channel: "distribuidor",
    address: "Av. Orosimbo Maia, 960",
    city: "Campinas",
    state: "SP",
    cep: "13010-211",
    phone: "(19) 3252-4400",
    whatsapp: "551932524400",
    email: "campinas@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 17h30",
    coordinates: { lat: -22.9056, lng: -47.0608 },
  },
  {
    id: "maza-sao-paulo",
    name: "Parceiro Maza - São Paulo",
    channel: "revenda",
    address: "Rua Vergueiro, 2045",
    city: "São Paulo",
    state: "SP",
    cep: "04101-000",
    phone: "(11) 3208-7711",
    whatsapp: "551132087711",
    email: "saopaulo@tintasmaza.com.br",
    hours: "Seg a sáb, 8h às 19h",
    coordinates: { lat: -23.5747, lng: -46.6355 },
  },
  {
    id: "maza-belo-horizonte",
    name: "Distribuidor Maza - Belo Horizonte",
    channel: "distribuidor",
    address: "Av. Afonso Pena, 1500",
    city: "Belo Horizonte",
    state: "MG",
    cep: "30130-005",
    phone: "(31) 3333-5566",
    whatsapp: "553133335566",
    email: "bh@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -19.9208, lng: -43.9378 },
  },
  {
    id: "maza-pocos-caldas",
    name: "Representante Maza - Poços de Caldas",
    channel: "revenda",
    address: "Rua Prefeito Chagas, 305",
    city: "Poços de Caldas",
    state: "MG",
    cep: "37701-010",
    phone: "(35) 3722-9090",
    whatsapp: "553537229090",
    email: "pocos@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -21.7854, lng: -46.5614 },
  },
  {
    id: "maza-curitiba",
    name: "Revenda Maza - Curitiba",
    channel: "revenda",
    address: "Rua XV de Novembro, 621",
    city: "Curitiba",
    state: "PR",
    cep: "80020-310",
    phone: "(41) 3015-8844",
    whatsapp: "554130158844",
    email: "curitiba@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -25.4284, lng: -49.2733 },
  },
  {
    id: "maza-rio-de-janeiro",
    name: "Parceiro Maza - Rio de Janeiro",
    channel: "revenda",
    address: "Rua da Assembleia, 77",
    city: "Rio de Janeiro",
    state: "RJ",
    cep: "20011-001",
    phone: "(21) 2509-7755",
    whatsapp: "552125097755",
    email: "rio@tintasmaza.com.br",
    hours: "Seg a sex, 8h às 18h",
    coordinates: { lat: -22.9068, lng: -43.1729 },
  },
];

export const MOCK_REPRESENTATIVES: RepresentativeLocation[] = [
  {
    id: "rep-farini-mg",
    name: "Ricardo S. Farini",
    company: "Farini Representação Comercial Ltda.",
    email: "diretoria@amazonfortimp.com.br",
    phone: "(19) 99159-4165",
    whatsapp: "5519991594165",
    state: "MG",
    city: "Poços de Caldas",
    address: "Rua XXX, 35 - Poços de Caldas/MG - CEP 37704-365",
    serviceCities: ["Poços de Caldas", "Andradas", "Varginha", "Pouso Alegre"],
    productLines: ["Imobiliária", "Impermeabilizantes"],
  },
  {
    id: "rep-mg-capital",
    name: "Mariana Costa",
    company: "Distribuidora MG Representações",
    email: "comercial@distribuidoramg.com.br",
    phone: "(31) 3333-5566",
    whatsapp: "553133335566",
    state: "MG",
    city: "Belo Horizonte",
    address: "Rua das Acácias, 80 - Belo Horizonte/MG - CEP 30130-100",
    serviceCities: ["Belo Horizonte", "Contagem", "Betim", "Nova Lima"],
    productLines: ["Imobiliária", "Industrial"],
  },
  {
    id: "rep-sp-mococa",
    name: "Paulo Henrique Martins",
    company: "PHM Representações",
    email: "paulo.martins@tintasmaza.com.br",
    phone: "(19) 3656-2210",
    whatsapp: "551936562210",
    state: "SP",
    city: "Mococa",
    address: "Av. João Batista de Lima Figueiredo, 780 - Mococa/SP - CEP 13730-000",
    serviceCities: ["Mococa", "Casa Branca", "São José do Rio Pardo", "Cajuru"],
    productLines: ["Imobiliária", "Automotivo"],
  },
  {
    id: "rep-sp-ribeirao",
    name: "Camila Rocha",
    company: "Rocha Soluções Comerciais",
    email: "ribeirao.representante@tintasmaza.com.br",
    phone: "(16) 3620-9090",
    whatsapp: "551636209090",
    state: "SP",
    city: "Ribeirão Preto",
    address: "Av. Presidente Vargas, 1472 - Ribeirão Preto/SP - CEP 14020-260",
    serviceCities: ["Ribeirão Preto", "Sertãozinho", "Jaboticabal", "Bebedouro"],
    productLines: ["Imobiliária", "Industrial", "Solventes"],
  },
  {
    id: "rep-sp-sao-paulo",
    name: "Eduardo Nunes",
    company: "Nunes Trade Representações",
    email: "sp.representante@tintasmaza.com.br",
    phone: "(11) 3208-7711",
    whatsapp: "551132087711",
    state: "SP",
    city: "São Paulo",
    address: "Rua Vergueiro, 2045 - São Paulo/SP - CEP 04101-000",
    serviceCities: ["São Paulo", "Guarulhos", "Osasco", "ABC Paulista"],
    productLines: ["Imobiliária", "Automotivo", "Industrial"],
  },
  {
    id: "rep-pr-curitiba",
    name: "Luiza Almeida",
    company: "Almeida Comercial",
    email: "curitiba.representante@tintasmaza.com.br",
    phone: "(41) 3015-8844",
    whatsapp: "554130158844",
    state: "PR",
    city: "Curitiba",
    address: "Rua XV de Novembro, 621 - Curitiba/PR - CEP 80020-310",
    serviceCities: ["Curitiba", "São José dos Pinhais", "Colombo", "Pinhais"],
    productLines: ["Imobiliária", "Impermeabilizantes"],
  },
  {
    id: "rep-rj-capital",
    name: "Fernanda Lopes",
    company: "Lopes Representações RJ",
    email: "rio.representante@tintasmaza.com.br",
    phone: "(21) 2509-7755",
    whatsapp: "552125097755",
    state: "RJ",
    city: "Rio de Janeiro",
    address: "Rua da Assembleia, 77 - Rio de Janeiro/RJ - CEP 20011-001",
    serviceCities: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu"],
    productLines: ["Imobiliária", "Industrial"],
  },
];

export const BRAZIL_CENTER: GeoPoint = { lat: -15.7801, lng: -47.9292 };

export const DEMO_CEPS: Array<{ label: string; cep: string; coordinates: GeoPoint }> = [
  { label: "Mococa", cep: "13730-000", coordinates: { lat: -21.4678, lng: -47.0044 } },
  { label: "São Paulo", cep: "01310-100", coordinates: { lat: -23.5614, lng: -46.6559 } },
  { label: "Belo Horizonte", cep: "30130-010", coordinates: { lat: -19.9187, lng: -43.9387 } },
  { label: "Curitiba", cep: "80010-000", coordinates: { lat: -25.4296, lng: -49.2719 } },
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

export function getDemoCepCoordinates(cep: string) {
  const normalizedCep = normalizeCep(cep);
  return DEMO_CEPS.find((item) => normalizeCep(item.cep) === normalizedCep)?.coordinates;
}

export function getRepresentativeStates() {
  return Array.from(new Set(MOCK_REPRESENTATIVES.map((representative) => representative.state))).sort();
}

export function getRepresentativeCities(state: string) {
  return Array.from(
    new Set(
      MOCK_REPRESENTATIVES.filter((representative) => representative.state === state).flatMap((representative) => [
        representative.city,
        ...representative.serviceCities,
      ]),
    ),
  ).sort((left, right) => left.localeCompare(right, "pt-BR"));
}

export function getRepresentativesByLocation(state: string, city: string) {
  return MOCK_REPRESENTATIVES.filter((representative) => {
    const matchesState = !state || representative.state === state;
    const matchesCity = !city || representative.city === city || representative.serviceCities.includes(city);

    return matchesState && matchesCity;
  });
}
