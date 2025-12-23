"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CategoryFilter } from "./_ui";
import { SizeFilter } from "./_ui";
import { PriceFilter } from "./_ui";
import { SlidersHorizontal } from "phosphor-react";
import { SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";

interface ProductFiltersSheetProps {
  categoryId?: number;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  onCategoryChange: (categoryId?: number) => void;
  onSizeChange: (size?: string) => void;
  onPriceChange: (min?: number, max?: number) => void;
}

export function ProductFiltersSheet(props: ProductFiltersSheetProps) {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-11 px-4
            border border-neutral-200 rounded-md
            text-sm text-neutral-700 bg-white cursor-pointer"
        >
          <SlidersHorizontal size={16} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="px-4">
        <SheetHeader className="px-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-medium">Filtros</SheetTitle>

            <SheetClose asChild>
              <X className="h-4 w-4 cursor-pointer" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6 flex flex-col gap-4">
          <section>
            <h3 className="mb-5 text-lg font-medium">Categorias</h3>
            <CategoryFilter
              value={props.categoryId}
              onChange={props.onCategoryChange}
            />
          </section>

          <section>
            <h3 className="mb-5 text-lg font-medium">Tamanho</h3>
            <SizeFilter value={props.size} onChange={props.onSizeChange} />
          </section>

          <section>
            <h3 className="mb-5 text-lg font-medium">Preço</h3>
            <PriceFilter
              value={{ min: props.minPrice, max: props.maxPrice }}
              onChange={props.onPriceChange}
            />

            <button
              type="button"
              onClick={() => {
                props.onCategoryChange(undefined);
                props.onSizeChange(undefined);
                props.onPriceChange(undefined, undefined);
              }}
              className="mt-12 text-sm underline text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Limpar filtros
            </button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
