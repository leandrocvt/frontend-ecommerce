import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

export interface InputPrefixProps {
  children: ReactNode;
  className?: string;
}

export function Prefix({ children, className }: InputPrefixProps) {
  return (
    <div
      className={twMerge(
        "flex h-12 items-center border border-[#E2E2E2] rounded-[5px] px-3 py-2 focus-within:ring-2 focus-within:ring-neutral-100",
        className
      )}
    >
      {children}
    </div>
  );
}