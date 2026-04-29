"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  useGsapMagneticCards,
  useGsapReveal,
} from "@/hooks/use-gsap-effects";

const PRODUCT_LINES = [
  {
    title: "Imobiliária",
    image: "/assets/figma/imobiliaria.png",
    href: "/produtos?category=imobiliaria&subcategory=Acabamentos",
    desc: "Tintas para residências e acabamentos profissionais.",
  },
  {
    title: "Automotivo",
    image: "/assets/figma/automotivo.png",
    href: "/produtos?category=automotiva&subcategory=Adesivos",
    desc: "Alta performance e acabamento impecável para veículos.",
  },
  {
    title: "Industrial",
    image: "/assets/figma/industrial.png",
    href: "/produtos?category=industrial&subcategory=Anticorrosivos",
    desc: "Proteção avançada para ambientes severos.",
  },
  {
    title: "Impermeabilizantes",
    image: "/assets/figma/impermeabilizantes.png",
    href: "/produtos?category=impermeabilizantes&subcategory=Mantas%20L%C3%ADquidas",
    desc: "Proteção completa contra umidade e infiltrações.",
  },
];

const CERTIFICATES = [
  { src: "/assets/certificates/iso.png", w: 85, h: 96 },
  { src: "/assets/certificates/tintaDeQualidade.png", w: 99, h: 100 },
  { src: "/assets/certificates/certificate-3.png", w: 86, h: 56 },
  { src: "/assets/certificates/certificate-4.png", w: 110, h: 59 },
  { src: "/assets/certificates/certificate-5.png", w: 110, h: 55 },
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapMagneticCards(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-24 lg:py-32 px-6 xl:px-10 overflow-hidden"
    >
      <div
        className="w-full max-w-[1440px] mx-auto flex flex-col gap-14"
      >
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div data-gsap-reveal className="flex flex-col gap-4 max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)] w-fit">
              <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                PRODUTOS
              </span>
            </div>
            <h2 className="font-roboto font-bold text-[40px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]">
              Nossas linhas de <span className="text-[#B11116]">produtos</span>.
            </h2>
            <p className="text-[#5F5F5A] text-[16px] lg:text-[17px] leading-[1.6]">
              Soluções completas para cada segmento, com tecnologia e qualidade Maza.
            </p>
          </div>

          <div data-gsap-reveal>
            <Link
              href="/produtos"
              className="group hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1C1C1C]/15 text-[#1C1C1C] text-[14px] font-semibold hover:border-[#B11116] hover:text-[#B11116] transition-colors"
            >
              <span>VER TODOS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Grid de produtos */}
        <div
          data-gsap-stagger="0.09"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PRODUCT_LINES.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>

      {/* Certificados */}
      <div
        data-gsap-reveal
        className="w-full max-w-[1440px] mx-auto mt-20 lg:mt-28"
      >
        <div className="flex items-center gap-6 mb-10">
          <div className="h-px flex-1 bg-[#E2E8F0]" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
            <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
              CERTIFICADOS
            </span>
          </div>
          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>

        <div className="flex justify-center items-center gap-10 lg:gap-16 flex-wrap grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          {CERTIFICATES.map((c) => (
            <div key={c.src} className="relative transition-transform hover:scale-110 duration-300" style={{ width: c.w, height: c.h }}>
              <Image src={c.src} alt="" fill sizes={`${c.w}px`} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  title: string;
  image: string;
  href: string;
  desc: string;
}

function ProductCard({ title, image, href, desc }: ProductCardProps) {
  return (
    <div data-gsap-reveal>
      <Link
        href={href}
        data-gsap-card
        className="group relative block w-full aspect-[16/11] rounded-2xl overflow-hidden border border-black/5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_-20px_rgba(177,17,22,0.35)] transition-shadow duration-500 transform-gpu"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1440px) 680px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        {/* Overlay gradiente */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
        />
        {/* Halo dourado no hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(251,185,67,0.25) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          data-gsap-card-glare
          className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen"
        />

        {/* Conteúdo */}
        <div className="absolute inset-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-end">
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 className="font-roboto font-bold text-[22px] sm:text-[26px] lg:text-[32px] text-white leading-tight break-words [overflow-wrap:anywhere]">
                {title}
              </h3>
              <p className="text-white/70 text-[13px] sm:text-[14px] max-w-[320px]">{desc}</p>
            </div>
            <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FBB943] text-[#1C1C1C] grid place-items-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <ArrowUpRight className="w-5 h-5" aria-hidden />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

