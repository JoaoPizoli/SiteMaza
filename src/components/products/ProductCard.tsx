"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  category: string;
  description: string;
  href: string;
}

export function ProductCard({ image, category, description, href }: ProductCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col w-full bg-white rounded-[10px] border border-[#E2E8F0] overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[1.4] bg-[#F8FAFC]">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm tracking-wider text-[#FBB943] uppercase">
            {category}
          </span>
          <p className="text-[13px] leading-relaxed text-[#64748B] line-clamp-3">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F1F5F9]">
          <span className="text-sm font-semibold text-[#1C1C1C] group-hover:text-[#B11116] transition-colors">
            Ver detalhes
          </span>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F5F9] group-hover:bg-[#B11116] transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
