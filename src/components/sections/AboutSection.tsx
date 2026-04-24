"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Building2, Leaf, ShieldCheck, Truck } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STATS = [
  { value: "+27", label: "Anos no mercado" },
  { value: "+600", label: "Cargas ofertadas por mês" },
  { value: "+85", label: "Transportadoras parceiras" },
];

const FEATURES = [
  { icon: Building2, title: "Fábrica em Mococa-SP", desc: "Instalações modernas com foco em tecnologia." },
  { icon: ShieldCheck, title: "Qualidade garantida", desc: "Processos certificados e rígidos padrões." },
  { icon: Leaf, title: "Responsabilidade ambiental", desc: "Produção consciente em cada etapa." },
  { icon: Truck, title: "Distribuição nacional", desc: "Logística robusta com +85 parceiros." },
];

export function AboutSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 px-6 xl:px-10 overflow-hidden">
      {/* Fundo sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#FCFCF7] to-white"
      />
      <div
        aria-hidden
        className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 -z-10"
        style={{ background: "radial-gradient(circle, rgba(251,185,67,0.25) 0%, transparent 70%)" }}
      />

      <motion.div
        className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Coluna esquerda — Texto */}
        <div className="flex flex-col gap-8">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
              <span className="font-roboto font-black text-[12px] tracking-[0.14em] text-[#B11116]">
                SOBRE NÓS
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-roboto font-bold text-[40px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]"
          >
            Tradição em <span className="text-[#B11116]">cada camada</span> de tinta.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-roboto text-[16px] lg:text-[17px] leading-[1.7] text-[#5F5F5A] max-w-[560px]"
          >
            Há 27 anos a Tintas Maza se destaca na fabricação de tintas imobiliárias,
            automotivas, industriais e solventes. Com fábrica em Mococa-SP, investimos
            continuamente em tecnologia, inovação e responsabilidade ambiental para
            entregar produtos com qualidade garantida.
          </motion.p>

          {/* Cards de diferencial */}
          <motion.ul
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li
                key={title}
                className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#B11116]/30 hover:shadow-[0_8px_30px_-10px_rgba(177,17,22,0.15)] transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#B11116]/8 text-[#B11116] grid place-items-center group-hover:bg-[#B11116] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" aria-hidden />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[14px] text-[#1C1C1C]">{title}</span>
                  <span className="text-[13px] text-[#5F5F5A] leading-snug">{desc}</span>
                </div>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <Link
              href="/sobre"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1C1C] text-white font-semibold text-[14px] tracking-[0.03em] hover:bg-[#B11116] transition-colors shadow-[0_10px_30px_-10px_rgba(28,28,28,0.4)]"
            >
              <span>CONHEÇA NOSSA HISTÓRIA</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </motion.div>
        </div>

        {/* Coluna direita — visual com números */}
        <motion.div variants={itemVariants} className="relative">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="flex flex-col gap-1"
                  >
                    <span className="font-roboto font-bold text-[44px] lg:text-[52px] leading-none text-white">
                      {s.value}
                    </span>
                    <span className="text-[13px] text-white/70 leading-snug">
                      {s.label}
                    </span>
                  </motion.div>
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

          {/* Card flutuante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-5 gap-4 items-center border border-black/5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FBB943]/20 grid place-items-center">
              <ShieldCheck className="w-6 h-6 text-[#B11116]" aria-hidden />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#5F5F5A]">Qualidade</span>
              <span className="font-bold text-[15px] text-[#1C1C1C]">Certificada ISO</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

