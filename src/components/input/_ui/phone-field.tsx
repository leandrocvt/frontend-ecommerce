"use client";

import { IMaskInput } from "react-imask";
import { Input } from "@/components";
import React from "react";
import { twMerge } from "tailwind-merge";

type PhoneFieldProps = React.ComponentProps<typeof Input.Field> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function PhoneField({
  value,
  onChange,
  placeholder,
  className,
  ...props
}: PhoneFieldProps) {
  return (
    <IMaskInput
      mask="(00) 00000-0000"
      value={value}
      onAccept={(val) =>
        onChange?.({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>)
      }
      {...props}
      placeholder={placeholder || "(00) 00000-0000"}
      className={twMerge(className, "w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]")}
    />
  );
}
