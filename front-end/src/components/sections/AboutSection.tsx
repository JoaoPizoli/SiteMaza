"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Leaf, ShieldCheck, Truck } from "lucide-react";
import {
  useGsapAmbientMotion,
  useGsapParallax,
  useGsapReveal,
} from "@/hooks/use-gsap-effects";

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
  useGsapAmbientMotion(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-0 pb-24 lg:pb-32 px-6 xl:px-10 overflow-hidden"
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
        aria-hidden
        data-gsap-parallax
        data-gsap-speed="6"
        className="absolute bottom-0 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 -z-10"
        style={{ background: "radial-gradient(circle, rgba(177,17,22,0.18) 0%, transparent 70%)" }}
      />

      <hr className="relative mx-auto mb-16 h-px w-full max-w-[1440px] border-0 bg-[#DEDED6]" />

      <div className="relative w-full max-w-[920px] mx-auto flex flex-col items-center text-center gap-8">
        <h2
          data-gsap-reveal
          className="font-roboto font-bold text-[40px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] max-w-[780px]"
        >
          Tradição em <span className="text-[#B11116]">cada camada</span> de tinta.
        </h2>

        <p
          data-gsap-reveal
          className="font-roboto text-[16px] lg:text-[17px] leading-[1.7] text-[#5F5F5A] max-w-[680px]"
        >
          Há 27 anos a Tintas Maza se destaca na fabricação de tintas imobiliárias,
          automotivas, industriais e solventes. Com fábrica em Mococa-SP, investimos
          continuamente em tecnologia, inovação e responsabilidade ambiental para
          entregar produtos com qualidade garantida.
        </p>

        <ul
          data-gsap-stagger="0.06"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-4"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              data-gsap-reveal
              className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#B11116]/30 hover:shadow-[0_8px_30px_-10px_rgba(177,17,22,0.15)] transition-all text-left"
            >
              <div className="text-[#B11116]">
                <Icon className="w-6 h-6" aria-hidden />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[14px] text-[#1C1C1C]">{title}</span>
                <span className="text-[13px] text-[#5F5F5A] leading-snug">{desc}</span>
              </div>
            </li>
          ))}
        </ul>

        <div data-gsap-reveal className="mt-2">
          <Link
            href="/sobre"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1C1C] text-white font-semibold text-[14px] tracking-[0.03em] hover:bg-[#B11116] transition-colors shadow-[0_10px_30px_-10px_rgba(28,28,28,0.4)]"
          >
            <span>CONHEÇA NOSSA HISTÓRIA</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
