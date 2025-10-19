"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { LoaderCircle } from "lucide-react";

const schema = z
  .object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "É necessário aceitar os termos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface StepAccessSecurityProps {
  onPrev: (data?: Partial<FormValues>) => void;
  onSubmit: (data: Partial<FormValues>) => void;
  isPending: boolean;
  defaultValues?: Partial<FormValues>;
}

export function StepAccessSecurity({
  onPrev,
  onSubmit,
  isPending,
  defaultValues,
}: StepAccessSecurityProps) {
  const [password, setPassword] = useState(defaultValues?.password ?? "");
  const [confirmPassword, setConfirmPassword] = useState(
    defaultValues?.confirmPassword ?? ""
  );
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState, getValues } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const hasMinLength = password.length >= 8;
  const hasLettersAndNumber =
    /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isFormValid =
    formState.isValid && hasMinLength && hasLettersAndNumber && passwordsMatch;

  const handleFormSubmit = (data: FormValues) => {
    const filteredData = {
      email: data.email,
      password: data.password,
    };
    onSubmit(filteredData);
  };

  return (
    <div className="flex flex-col text-left mt-10">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <Input.Prefix>
          <Input.Field placeholder="E-mail*" {...register("email")} />
        </Input.Prefix>

        <div className="grid md:grid-cols-2 gap-4">
          <Input.Prefix>
            <Input.PasswordField
              type={showPassword ? "text" : "password"}
              placeholder="Senha*"
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
              onToggleVisibility={() => setShowPassword((prev) => !prev)}
              isVisible={showPassword}
            />
          </Input.Prefix>

          <Input.Prefix>
            <Input.PasswordField
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar senha*"
              {...register("confirmPassword")}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onToggleVisibility={() => setShowPassword((prev) => !prev)}
              isVisible={showPassword}
            />
          </Input.Prefix>
        </div>

        <div className="text-sm mt-2 mb-4 space-y-1">
          <p
            className={`flex items-center gap-2 ${hasMinLength ? "text-green-600" : "text-gray-400"}`}
          >
            {hasMinLength ? "✓" : "✗"} Mínimo 8 caracteres
          </p>
          <p
            className={`flex items-center gap-2 ${hasLettersAndNumber ? "text-green-600" : "text-gray-400"}`}
          >
            {hasLettersAndNumber ? "✓" : "✗"} Letras minúsculas, maiúsculas e um
            número
          </p>
          <p
            className={`flex items-center gap-2 ${passwordsMatch ? "text-green-600" : "text-gray-400"}`}
          >
            {passwordsMatch ? "✓" : "✗"} As senhas coincidem
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-1"
            />
            <span>
              Li e concordo com os{" "}
              <a href="/terms" className="underline">
                Termos de uso
              </a>{" "}
              e{" "}
              <a href="/privacy" className="underline">
                Política de privacidade
              </a>
              .
            </span>
          </label>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="h-12 w-full md:w-[48%] flex items-center justify-center"
            disabled={!isFormValid || isPending}
            variant={!isFormValid || isPending ? "disabled" : "default"}
          >
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin mr-2" size={18} />
                Enviando...
              </>
            ) : (
              "Finalizar"
            )}
          </Button>
        </div>
      </form>

      <div className="flex justify-end mt-2">
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => {
              const currentData = { email: getValues("email") };
              onPrev(currentData);
            }}
            className="text-sm p-0"
            variant="link"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
