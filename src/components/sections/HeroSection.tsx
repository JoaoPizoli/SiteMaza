"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  useGsapCountUp,
  useGsapHero,
  useGsapParallax,
} from "@/hooks/use-gsap-effects";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapHero(sectionRef);
  useGsapParallax(sectionRef);
  useGsapCountUp(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="Apresentação Tintas Maza"
      className="relative w-full min-h-[760px] lg:min-h-[860px] flex items-center justify-center overflow-hidden isolate bg-[#B11116]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-[#C9161D] via-[#C9161D]/90 to-transparent"
      />
      {/* Camada 1 — gradiente base radial (vermelho profundo da marca) */}
      <div
        aria-hidden
        data-gsap-hero-bg
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 8%, #C9161D 0%, #B11116 34%, #8D0E12 64%, #3A0508 100%)",
        }}
      />

      {/* Camada 2 — blobs animados (mesh gradient sem imagem) */}
      <div
        aria-hidden
        data-gsap-hero-bg
        data-gsap-parallax
        data-gsap-speed="7"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-32 w-[620px] h-[620px] rounded-full blur-3xl opacity-60 animate-maza-mesh"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.55) 0%, rgba(251,185,67,0) 65%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[720px] h-[720px] rounded-full blur-3xl opacity-55 animate-maza-mesh"
          style={{
            animationDelay: "-6s",
            background:
              "radial-gradient(circle, rgba(255,70,90,0.55) 0%, rgba(255,70,90,0) 65%)",
          }}
        />
        <div
          className="absolute bottom-[-200px] left-1/3 w-[560px] h-[560px] rounded-full blur-3xl opacity-40 animate-maza-mesh"
          style={{
            animationDelay: "-12s",
            background:
              "radial-gradient(circle, rgba(160,0,16,0.8) 0%, rgba(160,0,16,0) 65%)",
          }}
        />
      </div>

      {/* Camada 3 — grid sutil e vinheta */}
      <div
        aria-hidden
        data-gsap-hero-bg
        data-gsap-parallax
        data-gsap-speed="4"
        className="absolute inset-0 -z-10 bg-maza-grid opacity-40"
      />
      <div
        aria-hidden
        data-gsap-hero-bg
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 56%, rgba(0,0,0,0.42) 100%)",
        }}
      />



      {/* Conteúdo */}
      <div
        aria-hidden
        data-gsap-paint-scene
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1440 860"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id="maza-paint-arc"
              x1="-120"
              y1="812"
              x2="1320"
              y2="710"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FBB943" stopOpacity="0.04" />
              <stop offset="18%" stopColor="#FBB943" stopOpacity="0.82" />
              <stop offset="52%" stopColor="#FFD996" stopOpacity="0.92" />
              <stop offset="82%" stopColor="#FBB943" stopOpacity="0.76" />
              <stop offset="100%" stopColor="#FBB943" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id="maza-paint-gloss"
              x1="80"
              y1="764"
              x2="1180"
              y2="560"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            data-gsap-paint-path
            d="M -170 812 C 118 760 308 632 534 590 C 736 552 908 588 1054 678 C 1198 766 1386 774 1600 724"
            className="opacity-0"
          />
          <path
            data-gsap-paint-arc
            d="M -170 812 C 118 760 308 632 534 590 C 736 552 908 588 1054 678 C 1198 766 1386 774 1600 724"
            stroke="url(#maza-paint-arc)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          <path
            data-gsap-paint-highlight
            d="M -108 790 C 172 728 342 628 548 604 C 726 584 882 618 1028 696 C 1158 758 1344 766 1548 724"
            stroke="url(#maza-paint-gloss)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0"
          />
        </svg>

        <div
          data-gsap-paint-brush
          className="absolute left-0 top-0 w-[260px] opacity-0 will-change-transform drop-shadow-[0_28px_38px_rgba(0,0,0,0.42)] sm:w-[340px] lg:w-[430px]"
        >
          <Image
            src="/assets/home/pincel.svg"
            alt=""
            width={960}
            height={640}
            unoptimized
            sizes="(min-width: 1024px) 430px, (min-width: 640px) 340px, 260px"
            className="h-auto w-full select-none object-contain"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="relative z-10 w-full max-w-[1440px] px-6 xl:px-10 pt-32 pb-20 flex flex-col gap-10"
      >
        {/* Tag */}
        <div data-gsap-hero-item>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.14)] border border-[rgba(255,217,150,0.35)] backdrop-blur-xl">
            <span className="font-black text-[12px] leading-none tracking-[0.14em] text-[#FBB943]">
              BEM VINDO À MAZA
            </span>
          </div>
        </div>

        {/* Título */}
        <div data-gsap-hero-item className="max-w-[920px]">
          <h1 className="font-roboto font-extrabold text-white text-[44px] sm:text-[56px] lg:text-[76px] leading-[1.05] tracking-[-0.02em]">
            Paixão por{" "}
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-[#FBB943] via-[#FFD996] to-[#FBB943] bg-clip-text text-transparent animate-maza-shine"
                style={{ WebkitBackgroundClip: "text" }}
              >
                qualidade
              </span>
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 right-0 h-[6px] rounded-full bg-gradient-to-r from-[#FBB943]/0 via-[#FBB943]/80 to-[#FBB943]/0"
              />
            </span>
            .
          </h1>
        </div>

        {/* Descrição + CTAs */}
        <div
          data-gsap-hero-item
          className="flex flex-col gap-8 max-w-[620px]"
        >
          <p className="font-roboto text-[17px] lg:text-[19px] leading-[1.6] text-[#F1F1EA]/90">
            Tintas imobiliárias, automotivas e industriais desenvolvidas com{" "}
            <span className="text-white font-medium">tecnologia</span> e{" "}
            <span className="text-white font-medium">27 anos</span> de tradição.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/sobre"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B11116] text-white font-semibold tracking-[0.03em] shadow-[0_20px_60px_-20px_rgba(177,17,22,0.7)] ring-1 ring-white/10 transition-all duration-300 hover:bg-[#A00010] hover:shadow-[0_25px_70px_-15px_rgba(177,17,22,0.9)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBB943]"
            >
              <span className="relative z-10">CONHEÇA A MAZA</span>
              <ArrowUpRight
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <Link
              href="/onde-encontrar?tipo=representantes#localizador"
              className="group inline-flex items-center gap-2 py-2 text-white font-bold tracking-[0.03em] text-[15px] sm:text-[16px] border-b-2 border-white/30 hover:border-[#FBB943] transition-colors"
            >
              <span>ENCONTRE UM REPRESENTANTE</span>
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>

        {/* Linha de métricas discreta */}
        <dl
          data-gsap-hero-item
          className="mt-8 grid grid-cols-2 gap-6 max-w-[420px] border-t border-white/10 pt-6"
        >
          {[
            { v: "27+", l: "anos de mercado", count: 27, suffix: "+" },
            { v: "Brasil", l: "distribuição nacional" },
          ].map((m) => (
            <div key={m.l} className="flex flex-col">
              <dt className="font-roboto text-[22px] sm:text-[28px] font-bold text-white leading-none">
                {typeof m.count === "number" ? (
                  <span
                    data-gsap-count={m.count}
                    data-gsap-suffix={m.suffix ?? ""}
                  >
                    {m.v}
                  </span>
                ) : (
                  m.v
                )}
              </dt>
              <dd className="mt-1 text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-white/60">
                {m.l}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#main-content"
        aria-label="Rolar para o conteúdo"
        data-gsap-hero-item
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Role</span>
        <span
          data-gsap-scroll-cue
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm"
        >
          <ChevronDown className="w-4 h-4" aria-hidden />
        </span>
      </a>
    </section>
  );
}

