"use client";

import { useState } from "react";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutate } from "@/hooks/auth";
import { resetPassowordSchema, ResetPasswordFormValues } from "@/types/auth";
import { useParams, useRouter } from "next/navigation";

export function FormResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const { mutate, isPending } = useResetPasswordMutate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const { register, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPassowordSchema),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutate({
      token: token as string,
      password: data.new_password,
    });
  };

  const hasMinLength = password.length >= 8;
  const hasLettersAndNumber =
    /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isFormValid = hasMinLength && hasLettersAndNumber && passwordsMatch;

  return (
    <div className="w-full md:w-[400px] py-[60px] md:border-2 border-[#F8F8F6] rounded-[10px] text-center">
      <h1 className="text-[22px] md:text-2xl mb-6">Nova senha</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-left px-10"
      >
        <Input.Root className="mt-5">
          <Input.Prefix>
            <Input.PasswordField
              type={showPassword ? "text" : "password"} 
              placeholder="Digite sua nova senha"
              disabled={isPending}
              {...register("new_password")}
              onChange={(e) => setPassword(e.target.value)}
              onToggleVisibility={() => setShowPassword((prev) => !prev)} 
              isVisible={showPassword}
            />
          </Input.Prefix>
        </Input.Root>

        <Input.Root>
          <Input.Prefix>
            <Input.PasswordField
              type={showPassword ? "text" : "password"} 
              placeholder="Confirme sua nova senha"
              disabled={isPending}
              {...register("new_confirmation_password")}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onToggleVisibility={() => setShowPassword((prev) => !prev)} 
              isVisible={showPassword}
            />
          </Input.Prefix>
        </Input.Root>

        <div className="text-sm mt-2 mb-4 space-y-1">
          <p
            className={`flex items-center gap-2 ${
              hasMinLength ? "text-green-600" : "text-gray-400"
            }`}
          >
            {hasMinLength ? "✓" : "✗"} Mínimo 8 caracteres
          </p>

          <p
            className={`flex items-center gap-2 ${
              hasLettersAndNumber ? "text-green-600" : "text-gray-400"
            }`}
          >
            {hasLettersAndNumber ? "✓" : "✗"} Letras minúsculas, maiúsculas e um
            número
          </p>

          <p
            className={`flex items-center gap-2 ${
              passwordsMatch ? "text-green-600" : "text-gray-400"
            }`}
          >
            {passwordsMatch ? "✓" : "✗"} As senhas coincidem
          </p>
        </div>

        <Button
          type="submit"
          disabled={isPending || !isFormValid}
          variant={isPending || !isFormValid ? "disabled" : "default"}
          className="h-12 w-full"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Salvar"}
        </Button>

        <Button
          type="button"
          variant="link"
          className="text-sm text-right self-end"
          onClick={() => router.push("/auth/login")}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
}
