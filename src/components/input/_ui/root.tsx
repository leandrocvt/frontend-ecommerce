import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputRootProps {
  children: ReactNode;
  className?: string;
}

export function Root({ children, className }: InputRootProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 w-full text-sm text-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}