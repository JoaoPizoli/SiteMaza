import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";
import { getAdminToken } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM_TIMEOUT_MS = 120_000;
export const maxDuration = 120;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  return handle(request, context, "PATCH");
}

export async function DELETE(request: Request, context: RouteContext) {
  return handle(request, context, "DELETE");
}

async function handle(
  request: Request,
  context: RouteContext,
  method: "PATCH" | "DELETE",
) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  let body: unknown;
  if (method === "PATCH") {
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${getBackendApiUrl()}/representante-admin/${numericId}`,
      {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          ...(method === "PATCH"
            ? { "Content-Type": "application/json" }
            : {}),
        },
        body: method === "PATCH" ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        cache: "no-store",
      },
    );

    const text = await response.text();
    return new NextResponse(text || "{}", {
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
