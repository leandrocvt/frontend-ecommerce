import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

export interface InputLabelProps {
  children: ReactNode;
  className?: string;
}

export function Label({ children, className }: InputLabelProps) {
  return (
    <label
      className={twMerge(
        "text-sm font-medium text-neutral-700 select-none",
        className
      )}
    >
      {children}
    </label>
  );
}