"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSortProps {
  onSortChange: (value: string) => void;
  value?: string;
}

const options = [
  "Mais relevantes",
  "Nome (A-Z)",
  "Nome (Z-A)",
  "Linha (A-Z)",
];

export function ProductSort({ onSortChange, value }: ProductSortProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value ?? options[0]);

  React.useEffect(() => {
    setSelected(value ?? options[0]);
  }, [value]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20 flex items-center gap-3">
      <span className="text-sm font-medium text-stone">Ordenar por</span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex min-w-[220px] items-center justify-between rounded-full border border-[#171d29]/10 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-colors hover:border-brand/18"
        >
          <span>{selected}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-stone transition-transform duration-200",
              isOpen && "rotate-180 text-brand",
            )}
          />
        </button>

        {isOpen ? (
          <div className="absolute right-0 top-full mt-3 w-full overflow-hidden rounded-[24px] border border-[#171d29]/10 bg-white p-2 shadow-[0_22px_50px_rgba(15,23,42,0.14)]">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full rounded-[18px] px-4 py-3 text-left text-sm transition-colors",
                  selected === option
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-sand/80",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
