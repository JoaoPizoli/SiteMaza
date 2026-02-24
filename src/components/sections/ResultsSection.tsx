"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export function ResultsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full py-20 flex flex-col items-center justify-center bg-white overflow-hidden">
      <motion.div
        className="w-full max-w-[1440px] px-6 xl:px-0 flex flex-col items-center gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Content */}
        <motion.div className="flex flex-col items-center gap-4 text-center max-w-[685px]" variants={itemVariants}>
          {/* Pill Tag */}
          <div className="flex items-center justify-center gap-[10px] px-2 py-1 rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
            <span className="font-roboto font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
              GALERIA DE VÍDEOS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-roboto font-semibold text-[49px] leading-[1.4em] text-[#1C1C1C]">
            Resultados que você pode ver.
          </h2>

          {/* Description */}
          <p className="font-roboto font-normal text-base leading-[1.5em] text-[#5F5F5A] max-w-[590px]">
            Da preparação ao acabamento final, acompanhe a performance das tintas Maza em diferentes superfícies e aplicações.
          </p>
        </motion.div>

        {/* Carousel / Cards */}
        <motion.div className="flex items-center justify-center gap-5 w-full" variants={itemVariants}>
          {/* Left Arrow */}
          <button className="w-10 h-10 flex items-center justify-center bg-[#F8FAFC] rounded-full shadow-[0_4px_60px_rgba(160,0,16,0.3),0_4px_60px_rgba(15,23,42,0.15)] hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#A00010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards Container */}
          <div className="flex items-center gap-5">
            {/* Left Card (Inactive) */}
            <div className="relative w-[276px] h-[357px] rounded-lg overflow-hidden opacity-20">
              <Image
                src="/assets/home/results/results-placeholder.png"
                alt="Result Video 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Center Card (Active) */}
            <div className="relative w-[305px] h-[395px] rounded-lg overflow-hidden shadow-xl z-10">
              <Image
                src="/assets/home/results/results-placeholder.png"
                alt="Result Video 2"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Card (Inactive) */}
            <div className="relative w-[277px] h-[359px] rounded-lg overflow-hidden opacity-20">
              <Image
                src="/assets/home/results/results-placeholder.png"
                alt="Result Video 3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Right Arrow */}
          <button className="w-10 h-10 flex items-center justify-center bg-[#F8FAFC] rounded-full shadow-[0_4px_60px_rgba(160,0,16,0.3),0_4px_60px_rgba(15,23,42,0.15)] hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#A00010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
