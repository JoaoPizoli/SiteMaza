import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RepresentantesAdminPanel } from "@/components/admin/RepresentantesAdminPanel";
import { getAdminToken } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Representantes | Painel administrativo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminRepresentantesPage() {
  const token = await getAdminToken();
  if (!token) {
    redirect("/admin/login");
  }

  return (
    <main className="flex h-dvh min-h-0 flex-col overflow-hidden px-6 lg:px-10">
      <RepresentantesAdminPanel />
    </main>
  );
}
