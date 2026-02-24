"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function HeroSection() {
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
    <section className="relative w-full h-[891px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/home/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay - Adjusted based on Figma design */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 w-full max-w-[1440px] px-6 xl:px-0 flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Row 1: Heading Area */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <div className="flex flex-col gap-1">
            
            {/* Tag: Bem Vindo */}
            <div className="flex items-center justify-center gap-[10px] px-2 py-1 w-fit rounded-[50px] bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px]">
              <span className="font-black text-[13px] leading-[1.5em] tracking-[0.12em] text-[#FBB943]">
                BEM VINDO A MAZA!
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-roboto font-extrabold text-[61px] leading-[1.4em] text-white max-w-[800px]">
              Paixão por qualidade!
            </h1>
          </div>
        </motion.div>

        {/* Row 2: Description & Buttons */}
        <motion.div className="flex flex-col gap-8 w-full max-w-[561px]" variants={itemVariants}>
          {/* Description */}
          <p className="font-roboto font-normal text-base leading-[1.5em] text-[#FCFCF7]">
            Tintas desenvolvidas com tecnologia e qualidade.
          </p>

          {/* Buttons Area */}
          <div className="flex items-center gap-8">
            {/* Primary CTA */}
            <Link
              href="/saiba-mais"
              className="flex items-center justify-center gap-1 px-8 py-4 rounded-[50px] bg-[#A00010] border-[4px] border-[rgba(160,0,16,0.4)] hover:bg-[#8a000e] transition-colors"
            >
              <span className="font-roboto font-semibold text-[17px] leading-[1.5em] tracking-[0.03em] text-[#F1F1EA]">
                SAIBA MAIS
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/representante"
              className="flex items-center justify-center gap-1 p-1 pr-2 border-b-[1.5px] border-white hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-[17px] leading-[1.5em] tracking-[0.03em] text-[#FCFCF7]">
                ENCONTRE UM REPRESENTANTE
              </span>
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src="/assets/home/arrow-up-right.svg"
                  alt="Arrow Up Right"
                  width={24}
                  height={24}
                />
              </div>
            </Link>
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Image
            src="/assets/home/icon-down-hero.svg"
            alt="Scroll Down"
            width={120}
            height={120}
            className=""
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
