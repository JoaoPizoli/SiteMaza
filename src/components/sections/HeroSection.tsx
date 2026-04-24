"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      aria-label="Apresentação Tintas Maza"
      className="relative w-full min-h-[760px] lg:min-h-[860px] flex items-center justify-center overflow-hidden isolate bg-[#0b0306]"
    >
      {/* Camada 1 — gradiente base radial (vermelho profundo da marca) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 15% 20%, #B11116 0%, #7a0b0f 45%, #2a0306 80%, #0b0306 100%)",
        }}
      />

      {/* Camada 2 — blobs animados (mesh gradient sem imagem) */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
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
      <div aria-hidden className="absolute inset-0 -z-10 bg-maza-grid opacity-40" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />



      {/* Conteúdo */}
      <motion.div
        className="relative z-10 w-full max-w-[1440px] px-6 xl:px-10 pt-32 pb-20 flex flex-col gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.14)] border border-[rgba(255,217,150,0.35)] backdrop-blur-xl">
            <span className="font-black text-[12px] leading-none tracking-[0.14em] text-[#FBB943]">
              BEM VINDO À MAZA
            </span>
          </div>
        </motion.div>

        {/* Título */}
        <motion.div variants={itemVariants} className="max-w-[920px]">
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
        </motion.div>

        {/* Descrição + CTAs */}
        <motion.div
          variants={itemVariants}
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
              href="/onde-encontrar"
              className="group inline-flex items-center gap-2 py-2 text-white font-bold tracking-[0.03em] text-[15px] sm:text-[16px] border-b-2 border-white/30 hover:border-[#FBB943] transition-colors"
            >
              <span>ENCONTRE UM REPRESENTANTE</span>
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </motion.div>

        {/* Linha de métricas discreta */}
        <motion.dl
          variants={itemVariants}
          className="mt-8 grid grid-cols-3 gap-6 max-w-[620px] border-t border-white/10 pt-6"
        >
          {[
            { v: "27+", l: "anos de mercado" },
            { v: "4", l: "linhas de produtos" },
            { v: "Brasil", l: "distribuição nacional" },
          ].map((m) => (
            <div key={m.l} className="flex flex-col">
              <dt className="font-roboto text-[22px] sm:text-[28px] font-bold text-white leading-none">
                {m.v}
              </dt>
              <dd className="mt-1 text-[12px] sm:text-[13px] uppercase tracking-[0.1em] text-white/60">
                {m.l}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#main-content"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Role</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm"
        >
          <ChevronDown className="w-4 h-4" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}

