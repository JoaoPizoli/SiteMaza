"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { X, MapPin, User, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface MobileMenuProps {
  onClose: () => void;
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Início", href: "/" },
  { label: "Sobre a Maza", href: "/sobre" },
  { label: "Linha de produtos", href: "/produtos" },
  { label: "Onde Encontrar", href: "/onde-encontrar" },
];

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function MobileMenu({ onClose }: MobileMenuProps) {
  // Bloqueia scroll do body + fecha com ESC
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-[#1C1C1C]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Painel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="relative w-[88%] max-w-[380px] h-full bg-gradient-to-b from-[#1C1C1C] via-[#2a0a0b] to-[#1C1C1C] text-white flex flex-col overflow-y-auto shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)]"
      >
        {/* Header do painel */}
        <div className="flex items-center justify-between px-6 h-[76px] border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src="/assets/navbar/logo-maza.png"
              alt="Tintas Maza"
              width={110}
              height={60}
              sizes="110px"
              loading="lazy"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Conteúdo */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 px-6 py-6 flex flex-col gap-8"
        >
          {/* Links principais */}
          <nav aria-label="Navegação principal" className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <motion.div key={l.label} variants={itemVariants}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-3.5 border-b border-white/5 text-[17px] font-medium text-white/90 hover:text-white transition-colors"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight
                    className="w-5 h-5 text-white/40 transition-all duration-300 group-hover:text-[#FBB943] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-2">
            <Link
              href="/onde-encontrar"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors text-[14px] font-medium"
            >
              <MapPin className="w-4 h-4" aria-hidden />
              <span>Onde encontrar</span>
            </Link>

            <Link
              href="https://portal.maza.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#FBB943] text-[#1C1C1C] hover:bg-[#ffca68] transition-colors text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(251,185,67,0.7)]"
            >
              <User className="w-4 h-4" aria-hidden />
              <span>Área do cliente</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Rodapé do painel */}
        <div className="px-6 py-5 border-t border-white/10 text-[12px] text-white/50">
          © {new Date().getFullYear()} Tintas Maza — Paixão por qualidade.
        </div>
      </motion.aside>
    </div>
  );
}

