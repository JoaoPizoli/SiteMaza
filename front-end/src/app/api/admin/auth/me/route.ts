import { NextResponse } from "next/server";
import { getBackendApiUrl } from "@/lib/api-config";
import { getAdminToken } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const response = await fetch(`${getBackendApiUrl()}/auth/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    if (!response.ok) {
      return NextResponse.json({ user: null }, { status: 502 });
    }

    const user = await response.json();
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 502 });
  }
}
