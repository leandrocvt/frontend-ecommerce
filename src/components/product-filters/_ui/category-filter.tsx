"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCategoriesTree } from "@/hooks/category";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductCategoryProps {
  value?: number;
  onChange: (value?: number) => void;
}

export function CategoryFilter({ value, onChange }: ProductCategoryProps) {
  const { data } = useCategoriesTree();
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {data?.map((category) => {
        const isOpen = openCategory === category.id;

        return (
          <div key={category.id}>
            {/* CATEGORY HEADER */}
            <button
              type="button"
              onClick={() =>
                setOpenCategory(isOpen ? null : category.id)
              }
              className="flex w-full items-center justify-between text-sm font-medium cursor-pointer"
            >
              {category.name}
              <ChevronDown
                size={16}
                className={`transition-transform cursor-pointer ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* CHILDREN */}
            {isOpen && (
              <div className="mt-2 ml-2 space-y-2">
                {category.children.map((child) => {
                  const checked = value === child.id;

                  return (
                    <label
                      key={child.id}
                      className="flex items-center gap-2 text-sm cursor-pointer select-none"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(isChecked) =>
                          onChange(isChecked ? child.id : undefined)
                        }
                      />
                      <span>{child.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
