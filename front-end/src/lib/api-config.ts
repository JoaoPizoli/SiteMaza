const DEFAULT_BACKEND_API_URL = "http://localhost:3002";

export function getBackendApiUrl() {
  const raw = process.env.BACKEND_API_URL?.trim();
  const url = raw && raw.length > 0 ? raw : DEFAULT_BACKEND_API_URL;

  return url.replace(/\/+$/, "");
}

export const BRAZIL_UFS: readonly string[] = Object.freeze([
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);

const BRAZIL_UFS_SET = new Set(BRAZIL_UFS);

export function isValidUf(value: string | null | undefined): value is string {
  return typeof value === "string" && BRAZIL_UFS_SET.has(value.trim().toUpperCase());
}
