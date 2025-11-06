"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

type UfFieldProps = React.ComponentProps<"input"> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function UfField({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: UfFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
    onChange?.({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={2}
      placeholder={placeholder || "UF"}
      className={twMerge(
        className,
        "uppercase w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]"
      )}
    />
  );
}
