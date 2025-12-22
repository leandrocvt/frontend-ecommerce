"use client";

interface SizeFilterProps {
  value?: string;
  onChange: (size?: string) => void;
}

const SIZES = ["PP", "P", "M", "G", "GG"];

export function SizeFilter({ value, onChange }: SizeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => {
        const selected = value === size;

        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(selected ? undefined : size)}
            className={`
              px-3 py-1 text-sm rounded border cursor-pointer
              ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 text-neutral-700 hover:border-primary"
              }
            `}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
