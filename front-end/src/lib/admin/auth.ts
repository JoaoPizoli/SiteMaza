import { cookies } from "next/headers";

export const ADMIN_TOKEN_COOKIE = "maza_admin_token";

export async function getAdminToken() {
  const store = await cookies();
  return store.get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}
