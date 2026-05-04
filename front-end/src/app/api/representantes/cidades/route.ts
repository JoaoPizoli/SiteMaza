import { NextResponse } from "next/server";
import { getBackendApiUrl, isValidUf } from "@/lib/api-config";

const CACHE_TTL_SECONDS = 60 * 60;
const UPSTREAM_TIMEOUT_MS = 8000;

type BackendCidade = { cidade?: string };

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ufRaw = searchParams.get("uf") ?? searchParams.get("state");

  if (!isValidUf(ufRaw)) {
    return NextResponse.json(
      { data: [], error: "UF inválida" },
      { status: 400 },
    );
  }

  const uf = ufRaw.trim().toUpperCase();
  const upstream = `${getBackendApiUrl()}/representante/cidades?uf=${encodeURIComponent(uf)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_TTL_SECONDS, tags: [`cidades:${uf}`] },
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
        { data: [], error: "Erro ao consultar cidades" },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as BackendCidade[] | { data?: BackendCidade[] };
    const rows = Array.isArray(payload) ? payload : (payload?.data ?? []);

    const cidades = Array.from(
      new Set(
        rows
          .map((row) => row?.cidade?.trim())
          .filter((cidade): cidade is string => Boolean(cidade && cidade.length > 0)),
      ),
    ).sort((left, right) => left.localeCompare(right, "pt-BR", { sensitivity: "base" }));

    return NextResponse.json(
      { data: cidades },
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
        error: isTimeout ? "Tempo limite ao consultar cidades" : "Erro ao consultar cidades",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
