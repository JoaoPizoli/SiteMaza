import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";
import { getAdminToken } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const UPSTREAM_TIMEOUT_MS = 280_000;

export async function POST() {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${getBackendApiUrl()}/representante-admin/sincronizar`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
        cache: "no-store",
      },
    );

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
          ? "Tempo limite ao sincronizar com o ERP"
          : "Erro ao sincronizar com o ERP",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
