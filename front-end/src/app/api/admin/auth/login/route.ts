import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM_TIMEOUT_MS = 8000;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8;

type LoginBody = { username?: unknown; password?: unknown };

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Informe usuário e senha" },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(`${getBackendApiUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Usuário ou senha inválidos" },
        { status: 401 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao autenticar" },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as {
      token?: string;
      user?: { id: number; username: string };
    };

    if (!payload.token) {
      return NextResponse.json({ error: "Resposta inválida" }, { status: 502 });
    }

    const res = NextResponse.json({ user: payload.user ?? null });
    res.cookies.set({
      name: ADMIN_TOKEN_COOKIE,
      value: payload.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE_SECONDS,
    });
    return res;
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "Tempo limite ao autenticar"
          : "Erro ao autenticar",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
