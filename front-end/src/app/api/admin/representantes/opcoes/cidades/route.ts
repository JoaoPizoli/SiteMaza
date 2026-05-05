import { NextResponse } from "next/server";
import { getBackendApiUrl, isValidUf } from "@/lib/api-config";
import { getAdminToken } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const UPSTREAM_TIMEOUT_MS = 60_000;

export async function GET(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const ufRaw = searchParams.get("uf");
  if (!isValidUf(ufRaw)) {
    return NextResponse.json({ error: "UF invalida" }, { status: 400 });
  }

  const uf = ufRaw.trim().toUpperCase();
  const upstream = `${getBackendApiUrl()}/representante-admin/opcoes/cidades?uf=${encodeURIComponent(uf)}`;

  return proxy(upstream, token);
}

async function proxy(url: string, token: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await response.text();
    return new NextResponse(text || "[]", {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "Tempo limite ao consultar cidades no ERP"
          : "Erro ao consultar cidades no ERP",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
