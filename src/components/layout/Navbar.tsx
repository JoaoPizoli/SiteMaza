"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { MobileMenu } from "./MobileMenu";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkText = pathname === "/sobre" || pathname?.startsWith("/produtos") || pathname?.startsWith("/produto");
  
  const logoSrc = isDarkText ? "/assets/figma/logo-maza.svg" : "/assets/navbar/logo-maza.png";
  const textColor = isDarkText ? "text-[#1C1C1C]" : "text-white";
  const hoverColor = isDarkText ? "hover:text-black" : "hover:text-white/80";
  const borderColor = isDarkText ? "border-[#1C1C1C]/20" : "border-white/20";
  const iconFilter = isDarkText ? "brightness(0)" : "";

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 flex justify-center">
        <div className="w-full max-w-[1440px] h-[101px] py-6 flex justify-between items-center px-6 xl:px-0">
          {/* Logo Area */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Maza Logo"
              width={125}
              height={71}
              priority
              className="object-cover"
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className={cn("lg:hidden p-2 transition-opacity hover:opacity-80", textColor)}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={32} />
          </button>
          
          {/* Content Area */}
          <div className="hidden lg:flex items-center gap-6 justify-end">
          {/* Nav Items 1 */}
          <div className="flex items-center gap-6">
            <Link href="/sobre" className={cn("font-medium text-base leading-[1.5em] transition-opacity hover:opacity-80", textColor)}>
              Sobre a Maza
            </Link>
            
            <Link href="/produtos" className="flex items-center gap-1 group">
              <span className={cn("font-medium text-base leading-[1.5em] transition-opacity group-hover:opacity-80", textColor)}>
                Linha de produtos
              </span>
              <Image
                src="/assets/navbar/corner-right-down.svg"
                alt="Arrow"
                width={18}
                height={18}
                style={{ filter: iconFilter }}
              />
            </Link>
            
            <Link href="/onde-encontrar" className={cn("font-normal text-base leading-[1.5em] transition-opacity hover:opacity-80", textColor)}>
              Representantes
            </Link>
          </div>

          {/* Divisor */}
          <div className={cn("w-px h-8 rounded", isDarkText ? "bg-[#1C1C1C]/20" : "bg-white/20")}></div>

          {/* Nav Items 2 */}
          <div className="flex items-center gap-4">
            <Link 
              href="/onde-encontrar" 
              className={cn("flex items-center gap-1 p-1 pr-3 bg-[rgba(177,17,22,0.2)] border border-[rgba(255,181,189,0.3)] backdrop-blur-[87.7px] rounded hover:bg-[rgba(177,17,22,0.3)] transition-colors",
                isDarkText ? "text-[#1C1C1C]" : "text-[#FFC9CB]"
              )}
            >
              <div className="w-[17px] h-[18px] flex items-center justify-center">
                <Image
                  src="/assets/navbar/map-pin.svg"
                  alt="Map Pin"
                  width={17}
                  height={18}
                  style={{ filter: isDarkText ? "brightness(0)" : "" }}
                />
              </div>
              <span className="font-normal text-base leading-[1.5em]">Onde encontrar</span>
            </Link>

            <Link 
              href="/area-cliente" 
              className="flex items-center gap-1 p-1 pr-3 bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px] rounded text-[#FBB943] hover:bg-[rgba(251,185,67,0.3)] transition-colors"
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                 <Image
                  src="/assets/navbar/user.svg"
                  alt="User"
                  width={18}
                  height={18}
                />
              </div>
              <span className="font-normal text-base leading-[1.5em]">Área do cliente</span>
            </Link>
          </div>

          {/* Search Button */}
          <button 
            className={cn("flex items-center justify-center w-8 h-8 p-1 rounded transition-colors", 
              isDarkText ? "bg-[#1C1C1C]/10 border border-[#1C1C1C]/20 hover:bg-[#1C1C1C]/20" : "bg-[rgba(241,241,234,0.2)] border border-[rgba(185,185,185,0.3)] hover:bg-[rgba(241,241,234,0.3)]"
            )}
            aria-label="Search"
          >
            <Image
              src="/assets/navbar/search-icon.svg"
              alt="Search"
              width={24}
              height={24}
              className="object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// Remove unused NavLink component or keep it if needed elsewhere (but here we replaced it)

