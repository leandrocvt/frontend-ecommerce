"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface PriceFilterProps {
  value?: {
    min?: number;
    max?: number;
  };
  onChange: (min?: number, max?: number) => void;
}

const PRICE_RANGES = [
  { label: "R$ 50 até R$ 100", min: 50, max: 100 },
  { label: "R$ 100 até R$ 200", min: 100, max: 200 },
  { label: "R$ 200 até R$ 300", min: 200, max: 300 },
  { label: "R$ 300 até R$ 400", min: 300, max: 400 },
  { label: "R$ 400 até R$ 500", min: 400, max: 500 },
  { label: "Acima de R$ 500", min: 500 },
];

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-3">
      {PRICE_RANGES.map((range) => {
        const checked =
          value?.min === range.min && value?.max === range.max;

        return (
          <label
            key={range.label}
            className="flex items-center gap-2 text-sm cursor-pointer select-none"
          >
            <Checkbox
              checked={checked}
              onCheckedChange={(isChecked) =>
                onChange(
                  isChecked ? range.min : undefined,
                  isChecked ? range.max : undefined
                )
              }
            />
            <span>{range.label}</span>
          </label>
        );
      })}
    </div>
  );
}
