"use client";

import { IMaskInput } from "react-imask";
import React from "react";
import { twMerge } from "tailwind-merge";

type CepFieldProps = React.ComponentProps<"input"> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function CepField({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: CepFieldProps) {
  return (
    <IMaskInput
      mask="00000-000"
      value={value}
      onAccept={(val) =>
        onChange?.({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>)
      }
      {...props}
      placeholder={placeholder || "00000-000"}
      className={twMerge(
        className,
        "w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]"
      )}
    />
  );
}
