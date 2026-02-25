"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSortProps {
  onSortChange: (value: string) => void;
}

export function ProductSort({ onSortChange }: ProductSortProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("Mais relevantes");

  const options = [
    "Mais relevantes",
    "Menor preço",
    "Maior preço",
    "Nome (A-Z)",
    "Nome (Z-A)",
  ];

  const handleSelect = (option: string) => {
    setSelected(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-4 relative z-20">
      <span className="text-sm font-medium text-[#64748B]">
        Ordenar por:
      </span>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#FBB943] transition-colors min-w-[180px] justify-between"
        >
          <span className="text-sm font-medium text-[#1C1C1C]">{selected}</span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-[#94A3B8] transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] transition-colors",
                  selected === option ? "text-[#FBB943] font-medium" : "text-[#1C1C1C]"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
