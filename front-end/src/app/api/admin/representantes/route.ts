import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";
import { getAdminToken } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM_TIMEOUT_MS = 120_000;
export const maxDuration = 120;

export async function GET(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const incoming = new URL(request.url);
  const upstreamUrl = new URL(`${getBackendApiUrl()}/representante-admin`);
  for (const key of ["uf", "search"]) {
    const value = incoming.searchParams.get(key);
    if (value) upstreamUrl.searchParams.set(key, value);
  }

  return proxy(upstreamUrl.toString(), {
    method: "GET",
    token,
  });
}

export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  return proxy(`${getBackendApiUrl()}/representante-admin`, {
    method: "POST",
    token,
    body,
  });
}

async function readJson(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function proxy(
  url: string,
  options: { method: string; token: string; body?: unknown },
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${options.token}`,
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "Tempo limite ao consultar painel"
          : "Erro ao consultar painel",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
