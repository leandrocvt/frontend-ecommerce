"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CategoryFilter } from "./_ui/category-filter";
import { SizeFilter } from "./_ui/size-filter";
import { PriceFilter } from "./_ui/price-filter";

interface ProductFiltersProps {
  categoryId?: number;
  size?: string;
  onCategoryChange: (categoryId?: number) => void;
  onSizeChange: (size?: string) => void;
  onPriceChange: (min?: number, max?: number) => void;
}

export function ProductFilters({
  categoryId,
  size,
  onCategoryChange,
  onSizeChange,
  onPriceChange,
}: ProductFiltersProps) {
  return (
    <aside className="w-64 rounded-lg border bg-white p-4">
      <Accordion
        type="multiple"
        defaultValue={["categories", "size", "price"]}
        className="space-y-2"
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent>
            <CategoryFilter value={categoryId} onChange={onCategoryChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Tamanho</AccordionTrigger>
          <AccordionContent>
            <SizeFilter value={size} onChange={onSizeChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <PriceFilter onChange={onPriceChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
