"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Content */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-[338px] h-full bg-[rgba(0,0,0,0.1)] backdrop-blur-[68.7px] flex flex-col p-3 gap-6 overflow-y-auto border-l border-white/10 shadow-2xl"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col gap-6 mt-12 px-3">
          {/* Nav Items 1 */}
          <div className="flex flex-col gap-2">
            <Link 
              href="/" 
              onClick={onClose}
              className="font-roboto font-normal text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity py-2"
            >
              Início
            </Link>
            
            <Link 
              href="/sobre" 
              onClick={onClose}
              className="font-roboto font-normal text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity py-2"
            >
              Sobre a Maza
            </Link>
            
            <Link 
              href="/produtos" 
              onClick={onClose}
              className="flex items-center gap-1 py-2 group"
            >
              <span className="font-roboto font-normal text-base leading-[1.5em] text-white group-hover:opacity-80 transition-opacity">
                Linha de produtos
              </span>
              <div className="w-4 h-4 flex items-center justify-center">
                <Image
                  src="/assets/navbar/corner-right-down.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
            
            <Link 
              href="/onde-encontrar" 
              onClick={onClose}
              className="font-roboto font-normal text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity py-2"
            >
              Onde encontrar
            </Link>
            
            <Link 
              href="/representantes" 
              onClick={onClose}
              className="font-roboto font-normal text-base leading-[1.5em] text-white hover:opacity-80 transition-opacity py-2"
            >
              Representantes
            </Link>
          </div>

          {/* Nav Items 2 (Buttons) */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/onde-encontrar" 
              onClick={onClose}
              className="flex items-center gap-1 p-1 pr-3 bg-[rgba(177,17,22,0.2)] border border-[rgba(255,181,189,0.3)] backdrop-blur-[87.7px] rounded text-[#FFC9CB] hover:bg-[rgba(177,17,22,0.3)] transition-colors w-fit"
            >
              <div className="w-[17px] h-[18px] flex items-center justify-center p-1">
                <Image
                  src="/assets/navbar/map-pin.svg"
                  alt="Map Pin"
                  width={17}
                  height={18}
                />
              </div>
              <span className="font-roboto font-normal text-base leading-[1.5em]">Onde encontrar</span>
            </Link>

            <Link 
              href="/area-cliente" 
              onClick={onClose}
              className="flex items-center gap-1 p-1 pr-3 bg-[rgba(251,185,67,0.2)] border border-[rgba(255,217,150,0.3)] backdrop-blur-[87.7px] rounded text-[#FBB943] hover:bg-[rgba(251,185,67,0.3)] transition-colors w-fit"
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center p-1">
                 <Image
                  src="/assets/navbar/user.svg"
                  alt="User"
                  width={18}
                  height={18}
                />
              </div>
              <span className="font-roboto font-normal text-base leading-[1.5em]">Área do cliente</span>
            </Link>

            {/* Search Button */}
            <button 
              className="flex items-center justify-start gap-2.5 p-1 bg-[rgba(173,173,173,0.2)] border border-[rgba(21,21,21,0.3)] rounded hover:bg-[rgba(173,173,173,0.3)] transition-colors w-fit"
              aria-label="Search"
            >
               <div className="w-6 h-6 flex items-center justify-center">
                 <Image
                  src="/assets/navbar/search-icon.svg"
                  alt="Search"
                  width={24}
                  height={24}
                />
               </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
