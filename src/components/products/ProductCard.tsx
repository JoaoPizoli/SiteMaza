"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  lineLabel: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  href: string;
}

export function ProductCard({
  image,
  lineLabel,
  category,
  subcategory,
  title,
  description,
  href,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group surface-panel flex h-full flex-col overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[1.12] overflow-hidden rounded-b-[28px] rounded-t-[32px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,32,0.02)_0%,rgba(18,22,32,0.38)_100%)]" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/70 bg-white/84 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {lineLabel}
          </span>
          <span className="rounded-full border border-white/12 bg-[#10151f]/68 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {subcategory}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {category}
          </p>
          <h3 className="font-display text-2xl leading-[1.08] text-ink">
            {title}
          </h3>
          <p className="text-sm leading-7 text-stone">{description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#171d29]/8 pt-5">
          <span className="text-sm font-semibold text-brand">Ver detalhes</span>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-translate-y-1">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
