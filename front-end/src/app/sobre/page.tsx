"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  type LucideIcon,
  ArrowUpRight,
  Award,
  Eye,
  HandHeart,
  Heart,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Target,
  TreePine,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useGsapAmbientMotion,
  useGsapCountUp,
  useGsapMagneticCards,
  useGsapParallax,
  useGsapReveal,
} from "@/hooks/use-gsap-effects";

type StatItem = { value: number; label: string; prefix: string };

const STATS: StatItem[] = [
  { value: 27, label: "Anos no mercado", prefix: "+" },
  { value: 600, label: "Cargas por mês", prefix: "+" },
  { value: 85, label: "Transportadoras parceiras", prefix: "+" },
  { value: 4, label: "Linhas de produtos", prefix: "" },
];

type Pillar = {
  icon: LucideIcon;
  index: string;
  title: string;
  text?: string;
  items?: string[];
};

const PILLARS: Pillar[] = [
  {
    icon: Eye,
    index: "01",
    title: "Visão",
    text: "Ser uma das principais organizações no segmento, reconhecida pela excelência e referência em produtos com qualidade.",
  },
  {
    icon: Target,
    index: "02",
    title: "Missão",
    text: "Como fabricante de tintas e vernizes, oferecer produtos de qualidade que satisfaçam as necessidades e expectativas dos nossos clientes.",
  },
  {
    icon: Heart,
    index: "03",
    title: "Valores",
    items: [
      "Pessoas — responsabilidade e confiança em cada relação.",
      "Clientes — razão das nossas operações.",
      "Qualidade — compromisso de todos.",
      "Trabalho em equipe — base do nosso crescimento.",
    ],
  },
];

const TIMELINE = [
  {
    year: "1997",
    title: "Fundação",
    desc: "Início das operações em Mococa-SP com foco em tintas imobiliárias.",
  },
  {
    year: "2008",
    title: "Expansão",
    desc: "Chegada das linhas automotiva e industrial ao portfólio.",
  },
  {
    year: "2016",
    title: "Inovação",
    desc: "Investimento em tecnologia e novos produtos com responsabilidade ambiental.",
  },
  {
    year: "Hoje",
    title: "Presença nacional",
    desc: "Mais de 85 transportadoras parceiras e distribuição em todo o Brasil.",
  },
];

const SUSTAINABILITY = [
  { icon: Recycle, title: "Zero resíduos", desc: "Nosso processo produtivo não gera nenhum resíduo." },
  { icon: ShieldCheck, title: "Fornecedores certificados", desc: "Selecionamos parceiros com cultura ambiental." },
  { icon: HandHeart, title: "Ações sociais", desc: "Projetos regionais de impacto social e cultural." },
  { icon: TreePine, title: "Política ambiental", desc: "Foco em produtos cada vez mais sustentáveis." },
];

const CERTIFICATES = [
  {
    src: "/assets/certificates/iso.png",
    w: 85,
    h: 96,
    name: "ISO 9001",
    desc: "Norma internacional de gestão da qualidade aplicada à fabricação e comercialização de tintas, vernizes e solventes.",
  },
  {
    src: "/assets/certificates/tintaDeQualidade.png",
    w: 99,
    h: 100,
    name: "Tinta de Qualidade",
    desc: "Empresa associada à ABRAFATI — Associação Brasileira dos Fabricantes de Tintas, atestando seriedade e qualidade.",
  },
  {
    src: "/assets/certificates/certificate-3.png",
    w: 86,
    h: 56,
    name: "Coatings Care",
    desc: "Programa internacional de compromisso com saúde, segurança e proteção ambiental na cadeia produtiva de tintas.",
  },
  {
    src: "/assets/certificates/certificate-4.png",
    w: 110,
    h: 59,
    name: "PBQP-H",
    desc: "Programa Brasileiro da Qualidade e Produtividade do Habitat — instrumento federal para modernização da construção civil.",
  },
  {
    src: "/assets/certificates/certificate-5.png",
    w: 110,
    h: 55,
    name: "Petrobras CRCC",
    desc: "Empresa cadastrada no CRCC Petrobras, apta a fornecer bens e participar de licitações via Petronect.",
  },
];

function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Reveal/parallax are handled by the parent <main> hooks so the Timeline only
  // owns its scroll-driven track-fill animation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!section || !track || !fill) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(fill, { scaleX: 1 });
      markerRefs.current.forEach((m) => m?.classList.add("is-lit"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      tl.to(fill, { scaleX: 1, ease: "none", duration: 1 }, 0);

      const total = markerRefs.current.length;
      markerRefs.current.forEach((marker, i) => {
        if (!marker) return;
        const at = (i + 0.5) / total;
        tl.call(
          () => marker.classList.add("is-lit"),
          undefined,
          at,
        );
      });

      // Reverse direction: remove class when scrolling back
      ScrollTrigger.create({
        trigger: track,
        start: "top 78%",
        end: "bottom 55%",
        onLeaveBack: () => {
          markerRefs.current.forEach((m) => m?.classList.remove("is-lit"));
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-24 lg:py-32 xl:px-10"
    >
      <div
        aria-hidden
        data-gsap-parallax
        data-gsap-speed="-6"
        className="pointer-events-none absolute -top-24 left-1/2 -z-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,185,67,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <div
            data-gsap-reveal
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5"
          >
            <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
              NOSSA JORNADA
            </span>
          </div>
          <h2
            data-gsap-reveal
            className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[52px]"
          >
            Quase 3 décadas de <span className="text-[#B11116]">história</span>.
          </h2>
          <p
            data-gsap-reveal
            className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]"
          >
            De um sonho em Mococa-SP a uma operação que entrega tintas para todo o
            Brasil — uma trajetória construída a cada camada.
          </p>
        </div>

        <div ref={trackRef} className="relative">
          <div
            aria-hidden
            className="absolute left-7 right-7 top-[26px] hidden h-[3px] rounded-full bg-[#1C1C1C]/[0.08] md:block"
          />
          <span
            ref={fillRef}
            aria-hidden
            className="absolute left-7 right-7 top-[26px] hidden h-[3px] rounded-full md:block"
            style={{
              background:
                "linear-gradient(90deg, #B11116 0%, #FBB943 50%, #B11116 100%)",
              boxShadow: "0 8px 22px -10px rgba(177,17,22,0.6)",
              transformOrigin: "left center",
            }}
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                data-gsap-reveal
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                className="group relative flex flex-col items-start gap-4"
              >
                <div className="relative h-14 w-14">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-[#1C1C1C]/[0.07] transition-all duration-500 group-[.is-lit]:bg-[rgba(177,17,22,0.12)]"
                  />
                  <span className="relative z-10 grid h-14 w-14 scale-90 place-items-center rounded-2xl text-[16px] font-extrabold text-[#1C1C1C]/30 ring-4 ring-white transition-all duration-500 group-[.is-lit]:scale-100 group-[.is-lit]:bg-gradient-to-br group-[.is-lit]:from-[#B11116] group-[.is-lit]:to-[#7a0b0f] group-[.is-lit]:text-white group-[.is-lit]:shadow-[0_15px_40px_-10px_rgba(177,17,22,0.55)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-[.is-lit]:opacity-100"
                    style={{
                      background: "rgba(177,17,22,0.25)",
                      animation: "maza-marker-ping 3s cubic-bezier(0,0,0.2,1) infinite",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[40px] font-extrabold leading-none tracking-[-0.02em] text-[#1C1C1C]/30 transition-colors duration-500 group-[.is-lit]:text-[#1C1C1C]">
                    {t.year}
                  </span>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#1C1C1C]/[0.05] px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#1C1C1C]/35 transition-colors duration-500 group-[.is-lit]:bg-[rgba(177,17,22,0.10)] group-[.is-lit]:text-[#B11116]">
                    {t.title}
                  </span>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[#1C1C1C]/30 transition-colors duration-500 group-[.is-lit]:text-[#5F5F5A]">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes maza-marker-ping {
          0%   { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default function AboutPage() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapReveal(rootRef);
  useGsapParallax(rootRef);
  useGsapCountUp(rootRef);
  useGsapMagneticCards(rootRef);
  useGsapAmbientMotion(rootRef);

  return (
    <main ref={rootRef} className="w-full bg-white font-roboto">
      {/* HERO */}
      <section
        aria-label="Sobre a Maza"
        className="relative isolate flex min-h-[820px] w-full items-center overflow-hidden px-6 pb-28 pt-[160px] xl:px-10"
      >
        <Image
          src="/assets/about/fabrica.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={65}
          fetchPriority="high"
          className="absolute inset-0 -z-30 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(28,28,28,0.85)_0%,rgba(28,28,28,0.55)_50%,rgba(28,28,28,0.18)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-white"
        />

        <div
          aria-hidden
          data-gsap-float
          data-gsap-float-y="-14"
          data-gsap-float-duration="5"
          className="pointer-events-none absolute right-[-10%] top-[12%] -z-10 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          data-gsap-float
          data-gsap-float-y="10"
          data-gsap-float-duration="6"
          className="pointer-events-none absolute left-[40%] top-[5%] -z-10 h-[320px] w-[320px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(177,17,22,0.45) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex w-full justify-start">
            <div className="flex w-full max-w-[720px] flex-col gap-7 rounded-[28px] border border-white/40 bg-white/95 p-7 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-10 lg:p-12">
              <div data-gsap-reveal className="flex items-center gap-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#B11116]" aria-hidden />
                  <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                    QUEM SOMOS
                  </span>
                </div>
                <span className="hidden h-px flex-1 bg-[#1C1C1C]/[0.08] sm:block" />
                <span className="hidden text-[12px] font-medium tracking-[0.1em] text-[#5F5F5A]/70 sm:block">
                  DESDE 1997
                </span>
              </div>

              <h1
                data-gsap-reveal
                className="text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-[#1C1C1C] md:text-[60px] lg:text-[72px]"
              >
                Conheça a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#B11116]">Maza</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 -z-0 h-[12px] rounded-sm bg-[#FBB943]/40"
                  />
                </span>
                .
              </h1>

              <p
                data-gsap-reveal
                className="max-w-[600px] text-[16px] leading-[1.7] text-[#5F5F5A] lg:text-[17px]"
              >
                Há 27 anos a Tintas Maza se destaca na fabricação de tintas
                imobiliárias, automotivas, industriais e solventes. Com fábrica em
                Mococa-SP, investimos continuamente em novas tecnologias e
                inovações para entregar produtos com qualidade garantida,
                responsabilidade ambiental e serviço excelente.
              </p>

              <div
                data-gsap-stagger="0.08"
                className="grid grid-cols-2 gap-5 border-t border-[#EBEBEB] pt-6 sm:grid-cols-4"
              >
                {STATS.map((s) => (
                  <div data-gsap-reveal key={s.label} className="flex flex-col gap-1">
                    <span className="text-[28px] font-bold leading-none text-[#B11116] lg:text-[34px]">
                      <span data-gsap-count={s.value} data-gsap-prefix={s.prefix}>
                        {s.prefix}
                        {s.value}
                      </span>
                    </span>
                    <span className="text-[12px] leading-snug text-[#5F5F5A]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div data-gsap-reveal className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/produtos"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#B11116] px-6 py-3 text-[14px] font-semibold tracking-[0.03em] text-white shadow-[0_18px_45px_-15px_rgba(177,17,22,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[#7a0b0f] hover:shadow-[0_24px_60px_-15px_rgba(177,17,22,0.7)]"
                >
                  <span>EXPLORAR PRODUTOS</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/onde-encontrar"
                  className="group inline-flex items-center gap-2 py-2 text-[14px] font-bold tracking-[0.04em] text-[#1C1C1C] transition-colors hover:text-[#B11116]"
                >
                  <span>ONDE ENCONTRAR</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO / ESSÊNCIA */}
      <section className="relative w-full overflow-hidden bg-white px-6 py-24 lg:py-32 xl:px-10">
        <div
          aria-hidden
          data-gsap-parallax
          data-gsap-speed="-8"
          className="pointer-events-none absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          data-gsap-parallax
          data-gsap-speed="6"
          className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(177,17,22,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center gap-8 text-center">
          <div
            data-gsap-reveal
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5"
          >
            <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
              NOSSA ESSÊNCIA
            </span>
          </div>
          <h2
            data-gsap-reveal
            className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[52px] lg:text-[58px]"
          >
            Tradição em <span className="text-[#B11116]">cada camada</span> de tinta.
          </h2>
          <p
            data-gsap-reveal
            className="max-w-[720px] text-[16px] leading-[1.7] text-[#5F5F5A] lg:text-[17px]"
          >
            Sempre buscando diferenciais, a Maza tem um dos maiores portfolios de
            tintas do mercado para todos os fins. Com muito trabalho, pessoas
            comprometidas, produtos de qualidade e compromisso com o sucesso de
            nossos clientes, seguimos construindo nossa história.
          </p>
          <p
            data-gsap-reveal
            className="max-w-[720px] text-[16px] leading-[1.7] text-[#5F5F5A]"
          >
            Da fábrica em Mococa-SP saem soluções completas para profissionais e
            consumidores que esperam o melhor: cor, cobertura, durabilidade e
            acabamento que se destaca.
          </p>

          <figure
            data-gsap-reveal
            className="relative mt-6 w-full max-w-[820px] rounded-3xl border border-[#EBEBEB] bg-[#FCFCF7] px-8 py-10 text-left shadow-[0_30px_80px_-40px_rgba(28,28,28,0.18)] md:px-12 md:py-12"
          >
            <span
              aria-hidden
              className="absolute left-6 top-6 font-roboto text-[100px] leading-none text-[#B11116]/15 md:left-10 md:top-4 md:text-[140px]"
            >
              &ldquo;
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#B11116] via-[#FBB943] to-[#B11116]"
            />
            <blockquote className="relative z-10">
              <p className="text-[20px] italic leading-[1.5] text-[#1C1C1C] md:text-[24px]">
                Muito trabalho, pessoas comprometidas e compromisso com o sucesso
                dos nossos clientes — é assim que continuamos nossa história.
              </p>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-10 bg-[#B11116]"
                />
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#B11116]">
                  Tintas Maza · Desde 1997
                </span>
              </figcaption>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* PILARES */}
      <section className="relative w-full overflow-hidden bg-[#FCFCF7] px-6 py-24 lg:py-32 xl:px-10">
        <div
          aria-hidden
          data-gsap-parallax
          data-gsap-speed="-6"
          className="pointer-events-none absolute -right-32 -top-40 -z-0 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <div
              data-gsap-reveal
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5"
            >
              <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                NOSSOS PILARES
              </span>
            </div>
            <h2
              data-gsap-reveal
              className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[52px]"
            >
              O que nos <span className="text-[#B11116]">move</span>.
            </h2>
            <p
              data-gsap-reveal
              className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]"
            >
              Os princípios que sustentam cada decisão, cada produto e cada
              relacionamento construído ao longo de quase três décadas.
            </p>
          </div>

          <div
            data-gsap-stagger="0.09"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {PILLARS.map(({ icon: Icon, title, text, items, index }) => (
              <article
                key={title}
                data-gsap-reveal
                className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white p-8 transition-all duration-500 hover:border-[#B11116]/30 hover:shadow-[0_30px_70px_-30px_rgba(177,17,22,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#B11116] via-[#FBB943] to-[#B11116] transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#B11116]/10 text-[#B11116] transition-all duration-500 group-hover:bg-[#B11116] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="text-[40px] font-bold leading-none tracking-[-0.02em] text-[#1C1C1C]/[0.06] transition-colors duration-500 group-hover:text-[#FBB943]/40">
                    {index}
                  </span>
                </div>

                <h3 className="text-[24px] font-bold tracking-[-0.01em] text-[#1C1C1C]">
                  {title}
                </h3>
                {text && (
                  <p className="text-[15px] leading-[1.65] text-[#5F5F5A]">{text}</p>
                )}
                {items && (
                  <ul className="flex flex-col gap-2.5">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-[#5F5F5A]"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B11116]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <TimelineSection />

      {/* SUSTENTABILIDADE */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1C1C1C] via-[#232323] to-[#1C1C1C] px-6 py-24 lg:py-32 xl:px-10">
        <div aria-hidden className="absolute inset-0 bg-maza-grid opacity-10" />
        <div
          aria-hidden
          data-gsap-float
          data-gsap-float-y="-16"
          data-gsap-float-duration="6"
          className="pointer-events-none absolute -bottom-32 -right-32 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(177,17,22,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          data-gsap-float
          data-gsap-float-y="14"
          data-gsap-float-duration="5"
          className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,185,67,0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
            <div
              data-gsap-reveal
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
            >
              <Leaf className="h-3.5 w-3.5 text-[#FBB943]" aria-hidden />
              <span className="text-[12px] font-black tracking-[0.14em] text-[#FBB943]">
                SUSTENTABILIDADE
              </span>
            </div>
            <h2
              data-gsap-reveal
              className="text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-[52px]"
            >
              Compromisso com o{" "}
              <span className="animate-maza-shine bg-gradient-to-r from-[#FBB943] via-[#FFD996] to-[#FBB943] bg-clip-text text-transparent">
                planeta
              </span>
              .
            </h2>
            <p
              data-gsap-reveal
              className="text-[16px] leading-[1.7] text-white/75 lg:text-[17px]"
            >
              A Maza não gera nenhum resíduo em seu processo de fabricação e
              seleciona somente fornecedores com certificados e cultura de proteção
              ambiental.
            </p>
            <p
              data-gsap-reveal
              className="text-[15px] leading-[1.7] text-white/65"
            >
              Em âmbito regional, mantemos ações sociais e culturais. É assim, com
              foco em processos e produtos cada vez mais sustentáveis, que
              conduzimos nossa política ambiental.
            </p>
          </div>

          <div
            data-gsap-stagger="0.08"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {SUSTAINABILITY.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                data-gsap-reveal
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#FBB943]/30 hover:bg-white/[0.07]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#FBB943] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#FBB943]/[0.12] ring-1 ring-[#FBB943]/25 transition-colors duration-300 group-hover:bg-[#FBB943]/20">
                  <Icon className="h-5 w-5 text-[#FBB943]" aria-hidden />
                </div>
                <h3 className="text-[16px] font-bold text-white">{title}</h3>
                <p className="text-[13px] leading-[1.55] text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICADOS */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#FCFCF7] px-6 pb-28 pt-20 lg:pb-32 lg:pt-24 xl:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              data-gsap-reveal
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(251,185,67,0.35)] bg-[rgba(251,185,67,0.15)] px-3 py-1.5"
            >
              <Award className="h-3.5 w-3.5 text-[#B11116]" aria-hidden />
              <span className="text-[12px] font-black tracking-[0.14em] text-[#B11116]">
                CERTIFICADOS
              </span>
            </div>
            <h2
              data-gsap-reveal
              className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1C1C] md:text-[44px]"
            >
              Reconhecimento e <span className="text-[#B11116]">confiança</span>.
            </h2>
            <p
              data-gsap-reveal
              className="max-w-[620px] text-[16px] leading-[1.6] text-[#5F5F5A]"
            >
              Selos e certificações que comprovam o compromisso da Maza com
              qualidade, segurança e responsabilidade ambiental.
            </p>
          </div>

          <div
            data-gsap-stagger="0.07"
            className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CERTIFICATES.map((c) => (
              <article
                key={c.name}
                data-gsap-reveal
                className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-6 transition-all duration-500 hover:border-[#B11116]/30 hover:shadow-[0_25px_60px_-25px_rgba(177,17,22,0.25)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#B11116] to-[#FBB943] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex h-[110px] items-center">
                  <div
                    className="relative flex-shrink-0"
                    style={{ width: c.w, height: c.h }}
                  >
                    <Image
                      src={c.src}
                      alt={c.name}
                      fill
                      sizes={`${c.w}px`}
                      quality={75}
                      loading="lazy"
                      className="object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-[#EBEBEB] pt-4">
                  <h3 className="text-[16px] font-bold text-[#1C1C1C]">{c.name}</h3>
                  <p className="text-[13px] leading-[1.55] text-[#5F5F5A]">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA fechamento */}
          <div
            data-gsap-reveal
            className="mt-10 flex flex-col items-center gap-5 text-center"
          >
            <h3 className="text-[24px] font-bold tracking-[-0.01em] text-[#1C1C1C] md:text-[28px]">
              Pronto para conhecer nossas soluções?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/produtos"
                className="group inline-flex items-center gap-2 rounded-full bg-[#B11116] px-6 py-3 text-[14px] font-semibold tracking-[0.03em] text-white shadow-[0_18px_45px_-15px_rgba(177,17,22,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[#7a0b0f]"
              >
                <span>VER PRODUTOS</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href="/onde-encontrar"
                className="group inline-flex items-center gap-2 rounded-full border border-[#1C1C1C]/15 bg-white px-6 py-3 text-[14px] font-semibold tracking-[0.03em] text-[#1C1C1C] transition-all hover:border-[#B11116] hover:text-[#B11116]"
              >
                <span>ONDE ENCONTRAR</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
