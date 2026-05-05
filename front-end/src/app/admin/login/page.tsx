import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminToken } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Login | Painel administrativo",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const token = await getAdminToken();
  if (token) {
    redirect("/admin/representantes");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-[420px] rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_40px_rgba(17,17,17,0.08)]">
        <header className="mb-6 flex flex-col gap-1">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B11116]">
            Maza · Painel
          </span>
          <h1 className="text-2xl font-bold leading-tight text-[#181818]">
            Acessar painel administrativo
          </h1>
          <p className="text-sm text-black/60">
            Entre com suas credenciais para gerenciar representantes por cidade.
          </p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
