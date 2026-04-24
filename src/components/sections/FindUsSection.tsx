"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MapPin, Users, ArrowUpRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FindUsSection() {
  return (
    <section className="w-full flex justify-center py-20 lg:py-24">
      <motion.div
        className="w-full relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="relative pt-10">
          {/* Ícone flutuante */}
          <motion.div
            variants={itemVariants}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center bg-white rounded-2xl shadow-[0_20px_60px_-20px_rgba(177,17,22,0.45)] w-20 h-20 border border-black/5"
          >
            <MapPin className="w-9 h-9 text-[#B11116]" aria-hidden />
          </motion.div>

          {/* Card principal */}
          <div
            className="w-full relative overflow-hidden px-6 md:px-12 py-16 lg:py-20 flex flex-col items-center justify-center text-center gap-10"
            style={{
              background:
                "linear-gradient(135deg, #B11116 0%, #8D1317 45%, #5a0a0d 100%)",
            }}
          >
            {/* Decorativos animados */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(251,185,67,0.5) 0%, transparent 70%)" }}
            />
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
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

            <motion.div variants={itemVariants} className="relative z-10 flex flex-col gap-6 items-center max-w-[680px]">
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
            </motion.div>

            <motion.div variants={itemVariants} className="relative z-10 flex flex-col sm:flex-row gap-4">
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

