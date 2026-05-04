import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";

const CACHE_TTL_SECONDS = 5 * 60;
const UPSTREAM_TIMEOUT_MS = 8000;
const MAX_CITY_LENGTH = 120;

type BackendRepresentante = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
};

type RepresentantePayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function pickString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRepresentantes(rows: BackendRepresentante[]): RepresentantePayload[] {
  return rows
    .map((row) => ({
      name: pickString(row?.name),
      company: pickString(row?.company),
      phone: pickString(row?.phone),
      email: pickString(row?.email),
    }))
    .filter((row) => row.name.length > 0 || row.company.length > 0);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityRaw = searchParams.get("city") ?? searchParams.get("cidade");
  const cidade = cityRaw?.trim().slice(0, MAX_CITY_LENGTH) ?? "";

  if (!cidade) {
    return NextResponse.json(
      { data: [], error: "Informe a cidade" },
      { status: 400 },
    );
  }

  const upstream = `${getBackendApiUrl()}/representante?cidade=${encodeURIComponent(cidade)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_TTL_SECONDS, tags: [`representantes:${cidade}`] },
    });

    if (response.status === 404) {
      return NextResponse.json(
        { data: [] },
        {
          headers: {
            "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${CACHE_TTL_SECONDS}`,
          },
        },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { data: [], error: "Erro ao consultar representantes" },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as
      | BackendRepresentante[]
      | { data?: BackendRepresentante[] };
    const rows = Array.isArray(payload) ? payload : (payload?.data ?? []);

    return NextResponse.json(
      { data: normalizeRepresentantes(rows) },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${CACHE_TTL_SECONDS}`,
        },
      },
    );
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        data: [],
        error: isTimeout
          ? "Tempo limite ao consultar representantes"
          : "Erro ao consultar representantes",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
