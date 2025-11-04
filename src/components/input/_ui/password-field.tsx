import { twMerge } from "tailwind-merge";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Field, InputFieldProps } from "./field";

export interface PasswordFieldProps extends InputFieldProps {
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

export function PasswordField({
  className,
  isVisible,
  onToggleVisibility,
  ...props
}: PasswordFieldProps) {

  const [internalVisible, setInternalVisible] = useState(false);
  const visible = isVisible ?? internalVisible;
  const toggle = onToggleVisibility ?? (() => setInternalVisible(!internalVisible));

  return (
    <div className="relative w-full">
      <Field
        {...props}
        type={visible ? "text" : "password"}
        className={twMerge("pr-10", className)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B5B9BE] cursor-pointer"
      >
        {visible ? <EyeSlash size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}