"use client";

import { IMaskInput } from "react-imask";
import { Input } from "@/components";
import React from "react";
import { twMerge } from "tailwind-merge";

type CpfCnpjFieldProps = React.ComponentProps<typeof Input.Field> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function CpfCnpjField({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: CpfCnpjFieldProps) {

  const mask = (value?.replace(/\D/g, "").length ?? 0) > 11 ? "00.000.000/0000-00" : "000.000.000-00";

  return (
    <IMaskInput
      mask={mask}
      value={value}
      onAccept={(val) =>
        onChange?.({
          target: { value: val },
        } as React.ChangeEvent<HTMLInputElement>)
      }
      {...props}
      placeholder={placeholder || "CPF ou CNPJ"}
      className={twMerge(
        className,
        "w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]"
      )}
    />
  );
}
