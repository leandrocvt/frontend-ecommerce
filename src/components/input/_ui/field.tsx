import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Field({ className, ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full bg-transparent outline-none text-sm placeholder:text-[#B5B9BE]",
        className
      )}
    />
  );
}
