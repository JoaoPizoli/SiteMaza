"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.8
    },
  },
};

const bgLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const bgRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export function Footer() {
  return (
    <footer className="w-full relative bg-[#B11116] overflow-hidden">
      {/* Vector Backgrounds */}
      <motion.div 
        className="absolute left-[-31px] top-[209px] pointer-events-none select-none z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={bgLeftVariants}
      >
        <Image
          src="/assets/footer/footer-bg-1.svg"
          alt="Background Vector 1"
          width={650}
          height={141}
        />
      </motion.div>
      <motion.div 
        className="absolute right-[-43px] top-[228px] pointer-events-none select-none z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={bgRightVariants}
      >
        <Image
          src="/assets/footer/footer-bg-2.svg"
          alt="Background Vector 2"
          width={356}
          height={141}
        />
      </motion.div>

      {/* Main Content */}
      <div className="w-full flex justify-center py-16 px-6 relative z-10">
        <motion.div 
          className="w-full max-w-[1440px] flex flex-col lg:flex-row justify-between gap-12 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          
          {/* Logo Column */}
          <motion.div className="flex-shrink-0" variants={logoVariants}>
            <Link href="/">
              <Image
                src="/assets/footer/logo-maza.png"
                alt="Maza Logo"
                width={168}
                height={95}
                className="object-contain"
              />
            </Link>
          </motion.div>

          {/* Links Columns Container */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            
            {/* Links Úteis */}
            <motion.div className="flex flex-col gap-4" variants={itemVariants}>
              <h5 className="font-roboto font-semibold text-[25px] leading-[1.4em] text-white">
                Links úteis
              </h5>
              <div className="flex flex-col gap-2">
                <Link href="/" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Início
                </Link>
                <Link href="/produtos" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Linha de produtos
                </Link>
                <Link href="/representantes" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Representantes
                </Link>
                <Link href="/onde-encontrar" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Onde encontrar
                </Link>
                <Link href="/area-cliente" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Área do cliente
                </Link>
                <Link href="/trabalhe-conosco" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Trabalhe conosco
                </Link>
                <Link href="/downloads" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Downloads
                </Link>
                <Link href="/mural" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Mural
                </Link>
              </div>
            </motion.div>

            {/* Linhas de Produtos */}
            <motion.div className="flex flex-col gap-4" variants={itemVariants}>
              <h5 className="font-roboto font-semibold text-[25px] leading-[1.4em] text-white">
                Linhas de produtos
              </h5>
              <div className="flex flex-col gap-2">
                <Link href="/produtos/imobiliaria" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Linha imobiliária
                </Link>
                <Link href="/produtos/automotiva" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Linha automotiva
                </Link>
                <Link href="/produtos/industrial" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Linha industrial
                </Link>
                <Link href="/produtos/impermeabilizantes" className="font-roboto font-normal text-[16px] leading-[1.5em] text-[#F1F1EA] hover:text-white transition-colors">
                  Linha Impermeabilizantes
                </Link>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex flex-col gap-4" variants={itemVariants}>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Image src="/assets/footer/instagram.svg" alt="Instagram" width={20} height={20} />
                </div>
                <span className="font-roboto font-normal text-[16px] leading-[1.5em] text-white group-hover:opacity-80 transition-opacity">
                  Instagram
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Image src="/assets/footer/facebook.svg" alt="Facebook" width={20} height={20} />
                </div>
                <span className="font-roboto font-normal text-[16px] leading-[1.5em] text-white group-hover:opacity-80 transition-opacity">
                  Facebook
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Image src="/assets/footer/linkedin.svg" alt="Linkedin" width={20} height={20} />
                </div>
                <span className="font-roboto font-normal text-[16px] leading-[1.5em] text-white group-hover:opacity-80 transition-opacity">
                  Linkedin
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#A00010] relative">
         {/* Decorative Top Border/Vector */}
        <div className="absolute top-0 left-0 w-full h-[4px]">
             <Image 
                src="/assets/footer/footer-bottom-bg.svg" 
                alt="Footer Divider" 
                width={1920} 
                height={4} 
                className="w-full h-full object-cover"
             />
        </div>

        <div className="flex justify-center py-6 px-6">
          <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <span className="font-roboto font-normal text-[13px] leading-[1.5em] text-white">
              Política de privacidade
            </span>
            <span className="font-roboto font-normal text-[13px] leading-[1.5em] text-white">
              Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
