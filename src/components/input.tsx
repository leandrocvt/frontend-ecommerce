import { ReactNode, InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Eye, EyeSlash } from "phosphor-react";

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

// ---- PASSWORD FIELD (com olhinho) ----
function PasswordField({ className, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Field
        {...props}
        type={showPassword ? "text" : "password"}
        className={twMerge("pr-10", className)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B5B9BE] cursor-pointer"
      >
        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
      </button>
    </div>
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
  PasswordField, // ✅ novo campo de senha
  ErrorMessages,
};
