"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPinned, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
  pathname: string;
  links: Array<{ href: string; label: string }>;
}

export function MobileMenu({ onClose, pathname, links }: MobileMenuProps) {
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-[#0e131d]/68 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar menu"
      />

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="surface-panel-dark relative flex h-full w-full max-w-[380px] flex-col gap-8 rounded-none rounded-l-[32px] border-l border-white/10 p-5"
      >
        <div className="flex items-center justify-between">
          <div className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
            <Image
              src="/assets/navbar/logo-maza.png"
              alt="Tintas Maza"
              width={104}
              height={58}
              className="h-auto w-[92px]"
            />
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition-colors hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">
            Presenca nacional
          </span>
          <p className="mt-3 text-sm leading-6 text-white/74">
            Linhas imobiliarias, automotivas, industriais e impermeabilizantes
            com foco em desempenho tecnico e acabamento profissional.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-[22px] px-4 py-3 text-base font-semibold transition-all duration-300",
                isActiveLink(link.href)
                  ? "bg-white text-ink shadow-[0_14px_32px_rgba(255,255,255,0.16)]"
                  : "text-white/74 hover:bg-white/8 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/onde-encontrar" onClick={onClose}>
              <MapPinned className="h-4 w-4" />
              Encontrar loja
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="border-white/10 bg-white/8 text-white hover:bg-white/12">
            <Link href="/produtos" onClick={onClose}>
              Ver catalogo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.aside>
    </div>
  );
}
