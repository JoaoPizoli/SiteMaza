import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";

const CACHE_TTL_SECONDS = 5 * 60;
const UPSTREAM_TIMEOUT_MS = 8000;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clampInt(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = clampInt(searchParams.get("limit"), 6, 1, 100);
  const offset = clampInt(searchParams.get("offset"), 0, 0, 10000);
  const upstream = new URL(`${getBackendApiUrl()}/loja`);

  upstream.searchParams.set("limit", String(limit));
  upstream.searchParams.set("offset", String(offset));
  upstream.searchParams.set("apenasGeolocalizadas", "true");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_TTL_SECONDS, tags: ["lojas"] },
    });

    if (!response.ok) {
      return NextResponse.json(
        { data: [], error: "Erro ao consultar lojas" },
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
        error: isTimeout ? "Tempo limite ao consultar lojas" : "Erro ao consultar lojas",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
