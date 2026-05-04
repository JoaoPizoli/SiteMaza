"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Leaf, ShieldCheck, Truck } from "lucide-react";
import {
  useGsapAmbientMotion,
  useGsapCountUp,
  useGsapParallax,
  useGsapReveal,
} from "@/hooks/use-gsap-effects";

const STATS = [
  { value: "+27", count: 27, label: "Anos no mercado" },
  { value: "+600", count: 600, label: "Cargas ofertadas por mês" },
  { value: "+85", count: 85, label: "Transportadoras parceiras" },
];

const FEATURES = [
  { icon: Building2, title: "Fábrica em Mococa-SP", desc: "Instalações modernas com foco em tecnologia." },
  { icon: ShieldCheck, title: "Qualidade garantida", desc: "Processos certificados e rígidos padrões." },
  { icon: Leaf, title: "Responsabilidade ambiental", desc: "Produção consciente em cada etapa." },
  { icon: Truck, title: "Distribuição nacional", desc: "Logística robusta com +85 parceiros." },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapParallax(sectionRef);
  useGsapCountUp(sectionRef);
  useGsapAmbientMotion(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 px-6 xl:px-10 overflow-hidden"
    >
      {/* Fundo sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FCFCF7] to-white"
      />
      <div
        aria-hidden
        data-gsap-parallax
        data-gsap-speed="-8"
        className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 -z-10"
        style={{ background: "radial-gradient(circle, rgba(251,185,67,0.25) 0%, transparent 70%)" }}
      />

      <div
        className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Coluna esquerda — Texto */}
        <div className="flex flex-col gap-8">
          <div data-gsap-reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
              <span className="font-roboto font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                SOBRE NÓS
              </span>
            </div>
          </div>

          <h2
            data-gsap-reveal
            className="font-roboto font-bold text-[40px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]"
          >
            Tradição em <span className="text-[#B11116]">cada camada</span> de tinta.
          </h2>

          <p
            data-gsap-reveal
            className="font-roboto text-[16px] lg:text-[17px] leading-[1.7] text-[#5F5F5A] max-w-[560px]"
          >
            Há 27 anos a Tintas Maza se destaca na fabricação de tintas imobiliárias,
            automotivas, industriais e solventes. Com fábrica em Mococa-SP, investimos
            continuamente em tecnologia, inovação e responsabilidade ambiental para
            entregar produtos com qualidade garantida.
          </p>

          {/* Cards de diferencial */}
          <ul
            data-gsap-stagger="0.06"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li
                key={title}
                data-gsap-reveal
                className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#B11116]/30 hover:shadow-[0_8px_30px_-10px_rgba(177,17,22,0.15)] transition-all"
              >
                <div className="flex-shrink-0 text-[#B11116]">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[14px] text-[#1C1C1C]">{title}</span>
                  <span className="text-[13px] text-[#5F5F5A] leading-snug">{desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div data-gsap-reveal>
            <Link
              href="/sobre"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1C1C] text-white font-semibold text-[14px] tracking-[0.03em] hover:bg-[#B11116] transition-colors shadow-[0_10px_30px_-10px_rgba(28,28,28,0.4)]"
            >
              <span>CONHEÇA NOSSA HISTÓRIA</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Coluna direita — visual com números */}
        <div data-gsap-reveal className="relative">
          <div
            className="relative rounded-3xl overflow-hidden p-10 lg:p-12 flex flex-col justify-end min-h-[500px]"
            style={{
              background:
                "linear-gradient(135deg, #B11116 0%, #7a0b0f 70%, #4a0608 100%)",
            }}
          >
            {/* Blob decorativo */}
            <div
              aria-hidden
              data-gsap-float
              data-gsap-float-y="-12"
              data-gsap-float-duration="4.5"
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-50"
              style={{ background: "radial-gradient(circle, #FBB943 0%, transparent 70%)" }}
            />
            {/* Grid sutil */}
            <div aria-hidden className="absolute inset-0 bg-maza-grid opacity-30" />

            <div className="relative z-10 flex flex-col gap-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-md">
                <span className="text-[11px] tracking-[0.14em] font-black text-[#FBB943]">
                  NÚMEROS QUE FALAM
                </span>
              </div>

              <div data-gsap-stagger="0.08" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    data-gsap-reveal
                    className="flex flex-col gap-1"
                  >
                    <span className="font-roboto font-bold text-[44px] lg:text-[52px] leading-none text-white">
                      <span data-gsap-count={s.count} data-gsap-prefix="+">
                        {s.value}
                      </span>
                    </span>
                    <span className="text-[13px] text-white/70 leading-snug">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/15">
                <p className="text-white/85 text-[15px] leading-relaxed italic">
                  &ldquo;Muito trabalho, pessoas comprometidas e compromisso com o
                  sucesso dos nossos clientes — é assim que continuamos nossa história.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

