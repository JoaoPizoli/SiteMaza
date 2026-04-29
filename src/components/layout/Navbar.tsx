"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MapPin, User, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Sobre a Maza", href: "/sobre" },
  {
    label: "Linha de produtos",
    href: "/produtos",
    children: [
      { label: "Imobiliária", href: "/produtos?category=imobiliaria", description: "Tintas para residências e comércios" },
      { label: "Automotiva", href: "/produtos?category=automotiva", description: "Alta performance e acabamento" },
      { label: "Industrial", href: "/produtos?category=industrial", description: "Proteção para ambientes severos" },
      { label: "Impermeabilizantes", href: "/produtos?category=impermeabilizantes", description: "Proteção contra umidade" },
    ],
  },
  { label: "Onde Encontrar", href: "/onde-encontrar" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Páginas com conteúdo claro abaixo precisam de nav escura desde o topo.
  const isLightPage =
    pathname?.startsWith("/produtos") ||
    pathname?.startsWith("/produto");

  // Aparência: escura quando scroll OU em página clara
  const solid = isScrolled || isLightPage;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = solid
    ? "/assets/figma/logo-maza.svg"
    : "/assets/navbar/logo-maza.png";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          solid
            ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_10px_30px_-15px_rgba(0,0,0,0.18)]"
            : "bg-transparent"
        )}
      >
        <nav
          aria-label="Principal"
          className="mx-auto w-full max-w-[1440px] px-6 xl:px-10 h-[76px] lg:h-[88px] flex items-center justify-between gap-6"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Página inicial Tintas Maza"
            className="flex-shrink-0 group"
          >
            <Image
              src={logoSrc}
              alt="Tintas Maza"
              width={120}
              height={68}
              priority
              className="object-contain h-10 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Links desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              const hasChildren = !!item.children?.length;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() =>
                    hasChildren && setOpenDropdown(item.href)
                  }
                  onMouseLeave={() =>
                    hasChildren && setOpenDropdown((v) => (v === item.href ? null : v))
                  }
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={
                      hasChildren ? openDropdown === item.href : undefined
                    }
                    className={cn(
                      "group relative inline-flex items-center gap-1 px-3 py-2 rounded-md text-[15px] font-medium transition-colors",
                      solid
                        ? "text-[#1C1C1C] hover:text-[#B11116]"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          openDropdown === item.href && "rotate-180"
                        )}
                        aria-hidden
                      />
                    )}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300",
                        solid ? "bg-[#B11116]" : "bg-[#FBB943]",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>

                  {/* Dropdown */}
                  {hasChildren && (
                    <AnimatePresence>
                      {openDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 top-full pt-3 w-[340px]"
                        >
                          <div className="rounded-2xl border border-black/5 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] overflow-hidden">
                            <ul className="p-2">
                              {item.children!.map((c) => (
                                <li key={c.href}>
                                  <Link
                                    href={c.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-[#B11116]/5 transition-colors group/link"
                                  >
                                    <span className="text-[14px] font-semibold text-[#1C1C1C] group-hover/link:text-[#B11116]">
                                      {c.label}
                                    </span>
                                    {c.description && (
                                      <span className="text-[12px] text-[#1C1C1C]/60">
                                        {c.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Ações à direita */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/onde-encontrar"
              className={cn(
                "inline-flex items-center gap-2 h-10 px-4 rounded-full text-[14px] font-medium transition-all",
                solid
                  ? "bg-[#B11116]/8 text-[#B11116] hover:bg-[#B11116]/15 border border-[#B11116]/15"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md"
              )}
            >
              <MapPin className="w-4 h-4" aria-hidden />
              <span>Onde encontrar</span>
            </Link>

            <Link
              href="https://portal.maza.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 h-10 px-4 rounded-full text-[14px] font-semibold transition-all shadow-sm",
                solid
                  ? "bg-[#FBB943] text-[#1C1C1C] hover:bg-[#ffca68]"
                  : "bg-[#FBB943] text-[#1C1C1C] hover:bg-[#ffca68]"
              )}
            >
              <User className="w-4 h-4" aria-hidden />
              <span>Área do cliente</span>
            </Link>

          </div>

          {/* Botão mobile */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors",
              solid
                ? "text-[#1C1C1C] hover:bg-[#1C1C1C]/5"
                : "text-white hover:bg-white/10"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>

        {/* Linha inferior sutil quando solid */}
        <div
          aria-hidden
          className={cn(
            "h-px w-full transition-opacity duration-300",
            solid ? "opacity-100 bg-black/5" : "opacity-0"
          )}
        />
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

