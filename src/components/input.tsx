import { ReactNode, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// ---- ROOT ----
interface InputRootProps {
  children: ReactNode;
  className?: string;
}

function Root({ children, className }: InputRootProps) {
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

// ---- LABEL ----
interface InputLabelProps {
  children: ReactNode;
  className?: string;
}

function Label({ children, className }: InputLabelProps) {
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

// ---- PREFIX ----
interface InputPrefixProps {
  children: ReactNode;
  className?: string;
}

function Prefix({ children, className }: InputPrefixProps) {
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

// ---- FIELD (o input real) ----
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Field({ className, ...props }: InputFieldProps) {
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

// ---- ERROR MESSAGE ----
interface InputErrorMessagesProps {
  errorMessage?: string;
}

function ErrorMessages({ errorMessage }: InputErrorMessagesProps) {
  if (!errorMessage) return null;
  return (
    <p className="text-xs text-red-600 mt-1 font-medium">{errorMessage}</p>
  );
}

// ---- EXPORTANDO COMPONENTE COMPLETO ----
export const Input = {
  Root,
  Label,
  Prefix,
  Field,
  ErrorMessages,
};
