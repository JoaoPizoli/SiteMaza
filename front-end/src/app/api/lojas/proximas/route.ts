import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";

const CACHE_TTL_SECONDS = 5 * 60;
const UPSTREAM_TIMEOUT_MS = 8000;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toCoordinate(value: string | null, min: number, max: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    return null;
  }

  return parsed;
}

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = toCoordinate(searchParams.get("lat"), -90, 90);
  const lng = toCoordinate(searchParams.get("lng"), -180, 180);
  const limit = clampInt(searchParams.get("limit"), 6, 1, 50);

  if (lat === null || lng === null) {
    return NextResponse.json(
      { data: [], error: "Coordenadas invalidas" },
      { status: 400 },
    );
  }

  const upstream = new URL(`${getBackendApiUrl()}/loja/proximas`);
  upstream.searchParams.set("lat", String(lat));
  upstream.searchParams.set("lng", String(lng));
  upstream.searchParams.set("limit", String(limit));

  const raioKm = searchParams.get("raioKm");
  if (raioKm) {
    upstream.searchParams.set("raioKm", raioKm);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_TTL_SECONDS, tags: [`lojas-proximas:${lat}:${lng}`] },
    });

    if (!response.ok) {
      return NextResponse.json(
        { data: [], error: "Erro ao consultar lojas proximas" },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as unknown;

    return NextResponse.json(
      { data: Array.isArray(payload) ? payload : [] },
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
          ? "Tempo limite ao consultar lojas proximas"
          : "Erro ao consultar lojas proximas",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
