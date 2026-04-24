"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const VIDEOS = [
  {
    title: "Aplicação em piso industrial",
    tag: "Industrial",
    image: "/assets/home/results/results-placeholder.png",
  },
  {
    title: "Pintura automotiva premium",
    tag: "Automotivo",
    image: "/assets/home/results/results-placeholder.png",
  },
  {
    title: "Acabamento residencial",
    tag: "Imobiliária",
    image: "/assets/home/results/results-placeholder.png",
  },
  {
    title: "Impermeabilização de laje",
    tag: "Impermeabilizantes",
    image: "/assets/home/results/results-placeholder.png",
  },
];

export function ResultsSection() {
  const [active, setActive] = useState(0);
  const total = VIDEOS.length;

  const next = () => setActive((v) => (v + 1) % total);
  const prev = () => setActive((v) => (v - 1 + total) % total);

  const getCardAt = (offset: number) => VIDEOS[(active + offset + total) % total];

  return (
    <section className="relative w-full py-24 lg:py-32 px-6 xl:px-10 overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
      <motion.div
        className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 text-center max-w-[700px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(251,185,67,0.15)] border border-[rgba(251,185,67,0.35)]">
            <span className="font-black text-[12px] tracking-[0.14em] text-[#B11116]">
              GALERIA DE VÍDEOS
            </span>
          </div>
          <h2 className="font-roboto font-bold text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#1C1C1C]">
            Resultados que você <span className="text-[#B11116]">pode ver</span>.
          </h2>
          <p className="text-[#5F5F5A] text-[16px] lg:text-[17px] leading-[1.6]">
            Da preparação ao acabamento final, acompanhe a performance das tintas Maza
            em diferentes superfícies e aplicações.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex items-center justify-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-full bg-white border border-black/5 text-[#B11116] shadow-[0_10px_30px_-10px_rgba(177,17,22,0.3)] hover:bg-[#B11116] hover:text-white hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1 max-w-[980px] h-[440px] flex items-center justify-center">
            {[-1, 0, 1].map((offset) => {
              const card = getCardAt(offset);
              const isActive = offset === 0;
              return (
                <AnimatePresence key={`${active}-${offset}`} mode="popLayout">
                  <motion.button
                    type="button"
                    onClick={() => !isActive && (offset === 1 ? next() : prev())}
                    aria-label={isActive ? `Reproduzir vídeo: ${card.title}` : card.title}
                    initial={{
                      opacity: 0,
                      x: offset * 40,
                      scale: isActive ? 0.95 : 0.8,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0.35,
                      x: offset * 260,
                      scale: isActive ? 1 : 0.85,
                      zIndex: isActive ? 10 : 1,
                    }}
                    exit={{ opacity: 0, x: offset * 80 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[320px] h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B11116]"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    {isActive && (
                      <>
                        <div className="absolute inset-0 grid place-items-center">
                          <motion.span
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-full bg-white/95 text-[#B11116] grid place-items-center shadow-2xl"
                          >
                            <Play className="w-6 h-6 fill-current ml-1" aria-hidden />
                          </motion.span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#FBB943] text-[#1C1C1C] text-[11px] font-bold tracking-wider mb-2">
                            {card.tag.toUpperCase()}
                          </span>
                          <h3 className="text-white font-semibold text-[17px] leading-snug">
                            {card.title}
                          </h3>
                        </div>
                      </>
                    )}
                  </motion.button>
                </AnimatePresence>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo"
            className="flex-shrink-0 w-12 h-12 grid place-items-center rounded-full bg-white border border-black/5 text-[#B11116] shadow-[0_10px_30px_-10px_rgba(177,17,22,0.3)] hover:bg-[#B11116] hover:text-white hover:scale-110 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Indicadores */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para vídeo ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-[#B11116]" : "w-1.5 bg-[#1C1C1C]/20 hover:bg-[#1C1C1C]/40"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

