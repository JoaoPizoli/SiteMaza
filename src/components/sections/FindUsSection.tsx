"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, ArrowUpRight } from "lucide-react";
import {
  useGsapAmbientMotion,
  useGsapParallax,
  useGsapReveal,
} from "@/hooks/use-gsap-effects";

export function FindUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(sectionRef);
  useGsapParallax(sectionRef);
  useGsapAmbientMotion(sectionRef);

  return (
    <section ref={sectionRef} className="w-full flex justify-center py-20 lg:py-24">
      <div
        className="w-full relative"
      >
        <div className="relative pt-10">
          {/* Ícone flutuante */}
          <div
            data-gsap-reveal
            className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center bg-white rounded-2xl shadow-[0_20px_60px_-20px_rgba(177,17,22,0.45)] w-20 h-20 border border-black/5"
          >
            <div
              data-gsap-float
              data-gsap-float-y="-7"
              data-gsap-float-duration="2.8"
            >
              <MapPin className="w-9 h-9 text-[#B11116]" aria-hidden />
            </div>
          </div>

          {/* Card principal */}
          <div
            className="w-full relative overflow-hidden px-6 md:px-12 py-16 lg:py-20 flex flex-col items-center justify-center text-center gap-10"
            style={{
              background:
                "linear-gradient(135deg, #B11116 0%, #8D1317 45%, #5a0a0d 100%)",
            }}
          >
            {/* Decorativos animados */}
            <div
              aria-hidden
              data-gsap-parallax
              data-gsap-speed="-8"
              className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(251,185,67,0.5) 0%, transparent 70%)" }}
            />
            <div
              aria-hidden
              data-gsap-parallax
              data-gsap-speed="7"
              className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)" }}
            />
            <div aria-hidden className="absolute inset-0 bg-maza-grid opacity-25" />
            {/* SVGs originais (se existirem) como camada sutil */}
            <div aria-hidden className="absolute top-0 left-0 opacity-40 pointer-events-none select-none">
              <Image
                src="/assets/home/find-us/vector-bg-left.svg"
                alt=""
                width={320}
                height={280}
              />
            </div>

            <div data-gsap-reveal className="relative z-10 flex flex-col gap-6 items-center max-w-[680px]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="text-[11px] tracking-[0.14em] font-black text-[#FBB943]">
                  EM TODO O BRASIL
                </span>
              </div>
              <h2 className="font-roboto font-bold text-white text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.01em]">
                Procurando a Maza perto de você?
              </h2>
              <p className="text-white/80 text-[16px] leading-relaxed max-w-[520px]">
                Encontre representantes e lojas físicas em sua região. Presença nacional com qualidade garantida.
              </p>
            </div>

            <div data-gsap-reveal className="relative z-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/onde-encontrar"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1C1C1C] font-semibold text-[14px] tracking-[0.03em] hover:bg-[#FBB943] transition-colors shadow-xl"
              >
                <MapPin className="w-4 h-4" aria-hidden />
                <span>VER LOJAS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>

              <Link
                href="/onde-encontrar"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white font-semibold text-[14px] tracking-[0.03em] hover:bg-white/20 transition-colors"
              >
                <Users className="w-4 h-4" aria-hidden />
                <span>VER REPRESENTANTES</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

