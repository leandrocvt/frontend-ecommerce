"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  UpdatePasswordFormValues,
} from "@/types/user/types-update-password";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdatePasswordMutate } from "@/hooks/user/use-update-password-mutate";

export function UpdatePasswordForm() {
  const router = useRouter();
  const { mutate, isPending } = useUpdatePasswordMutate();
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => setIsClient(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const hasMinLength = password.length >= 8;
  const hasLettersAndNumber =
    /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const isFormValid = hasMinLength && hasLettersAndNumber && passwordsMatch;

  function onSubmit(data: UpdatePasswordFormValues) {
    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  if (!isClient)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );

  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="Alterar senha"
        description="Crie uma nova senha. Ela será utilizada para acessar sua conta."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[#F8F8F6] border-2 rounded-[10px] p-6 space-y-4 2xl:w-3/5"
      >
        <div>
          <p className="text-sm font-medium mb-2">Senha atual</p>
          <Input.Prefix>
            <Input.PasswordField
              placeholder="Digite sua senha atual"
              type={showPassword ? "text" : "password"}
              {...register("currentPassword")}
              onToggleVisibility={() => setShowPassword((p) => !p)}
              isVisible={showPassword}
            />
          </Input.Prefix>
          {errors.currentPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input.Prefix>
              <Input.PasswordField
                placeholder="Digite sua nova senha*"
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
                onChange={(e) => setPassword(e.target.value)}
                onToggleVisibility={() => setShowPassword((p) => !p)}
                isVisible={showPassword}
              />
            </Input.Prefix>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Input.Prefix>
              <Input.PasswordField
                placeholder="Confirmar nova senha*"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onToggleVisibility={() => setShowPassword((p) => !p)}
                isVisible={showPassword}
              />
            </Input.Prefix>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="text-xs mt-2 mb-4 space-y-1">
          <p className={`${hasMinLength ? "text-green-600" : "text-gray-400"}`}>
            {hasMinLength ? "✓" : "✗"} Mínimo 8 caracteres
          </p>
          <p
            className={`${
              hasLettersAndNumber ? "text-green-600" : "text-gray-400"
            }`}
          >
            {hasLettersAndNumber ? "✓" : "✗"} Letras minúsculas, maiúsculas e um
            número
          </p>
          <p
            className={`${passwordsMatch ? "text-green-600" : "text-gray-400"}`}
          >
            {passwordsMatch ? "✓" : "✗"} As senhas coincidem
          </p>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button
            type="submit"
            disabled={isPending || !isFormValid}
            className="w-full lg:w-56 h-12 text-sm"
          >
            {isPending ? "Salvando..." : "Alterar senha"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/user/account")}
            className="w-full lg:w-32 h-12 text-sm border-2 border-black font-medium"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
}
