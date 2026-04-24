import type { Metadata } from "next";
import { MapPin, Search, Store, Users } from "lucide-react";
import { StoreLocator } from "@/components/store-locator/StoreLocator";

export const metadata: Metadata = {
  title: "Onde encontrar",
  description: "Encontre a loja física, revenda ou representante Maza mais próximo.",
};

export default function FindUsPage() {
  return (
    <main className="w-full bg-[#FCFCF7] font-roboto">
      <section className="relative isolate flex min-h-[560px] w-full items-end overflow-hidden px-6 pb-40 pt-[160px] xl:px-10">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#B11116_0%,#7a0b0f_58%,#4a0608_100%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-maza-grid opacity-30" />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <Store className="h-3.5 w-3.5 text-[#FBB943]" aria-hidden />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#FBB943]">
              Lojas & representantes Maza
            </span>
          </div>

          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-[42px] font-bold leading-[1.02] tracking-normal text-white md:text-[64px]">
              Encontre lojas e representantes Maza perto de você.
            </h1>
            <p className="max-w-[580px] text-[17px] leading-[1.65] text-white/86">
              Informe seu CEP para ver lojas no mapa ou selecione estado e cidade para falar com um representante.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm font-bold text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Search className="h-4 w-4 text-[#FBB943]" aria-hidden />
              Busca otimizada por CEP
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-[#FBB943]" aria-hidden />
              Mapa interativo
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Users className="h-4 w-4 text-[#FBB943]" aria-hidden />
              Representantes por cidade
            </span>
          </div>
        </div>
      </section>

      <StoreLocator />
    </main>
  );
}
