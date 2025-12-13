"use client";

import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchField({ className, ...props }: SearchFieldProps) {
  return (
    <input
      type="text"
      {...props}
      className={twMerge(
        "w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]",
        className
      )}
    />
  );
}
