"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPinned, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/sobre", label: "Sobre a Maza" },
  { href: "/produtos", label: "Produtos" },
  { href: "/onde-encontrar", label: "Onde encontrar" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav className="site-container">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-white/12 bg-[#10151f]/78 px-3 py-3 shadow-[0_24px_60px_rgba(15,23,42,0.34)] backdrop-blur-xl md:px-5">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/6 px-3 py-2">
                <Image
                  src="/assets/navbar/logo-maza.png"
                  alt="Tintas Maza"
                  width={104}
                  height={58}
                  priority
                  className="h-auto w-[88px] md:w-[104px]"
                />
              </div>

              <div className="hidden xl:flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  Industria brasileira
                </span>
                <span className="text-sm font-medium text-white/78">
                  Solucoes profissionais em tintas e revestimentos
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                    isActiveLink(link.href)
                      ? "bg-white text-ink shadow-[0_12px_28px_rgba(255,255,255,0.18)]"
                      : "text-white/74 hover:bg-white/8 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/72 xl:flex">
                <span className="h-2 w-2 rounded-full bg-gold" />
                27 anos de mercado
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/8 text-white hover:bg-white/12"
              >
                <Link href="/produtos">
                  Catalogo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="secondary" size="sm">
                <Link href="/onde-encontrar">
                  <MapPinned className="h-4 w-4" />
                  Onde encontrar
                </Link>
              </Button>
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition-colors hover:bg-white/12 lg:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <MobileMenu
            links={NAV_LINKS}
            pathname={pathname}
            onClose={() => setIsMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
