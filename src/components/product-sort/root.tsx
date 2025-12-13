"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  PRODUCT_SORT_OPTIONS,
  ProductSort as ProductSortType,
} from "@/types/product";

interface ProductSortProps {
  value: ProductSortType;
  onChange: (value: ProductSortType) => void;
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  const selectedLabel =
    PRODUCT_SORT_OPTIONS.find((o) => o.value === value)?.label ??
    "Organizar por";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="
            flex items-center gap-2 h-11 px-4
            border border-neutral-200 rounded-md
            text-sm text-neutral-700 bg-white cursor-pointer
          "
        >
          {selectedLabel}
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {PRODUCT_SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={
              option.value === value
                ? "font-medium text-primary"
                : ""
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
