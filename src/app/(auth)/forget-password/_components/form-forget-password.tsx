"use client";

import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPassowordSchema, ForgetPasswordFormValues } from "@/types/auth";
import { Input } from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutate } from "@/hooks/auth";

export function FormForgetPassword() {
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { mutate, isPending } = useForgetPasswordMutate(() => {
    // Agora o sucesso apenas mostra a tela de confirmação
    setIsEmailSent(true);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPassowordSchema),
  });

  const onSubmit = (data: ForgetPasswordFormValues) => {
    mutate(data);
  };

  if (isEmailSent) {
    return (
      <div className="w-[400px] md:border-2 border-[#F8F8F6] rounded-[10px] py-[60px] px-8 text-center">
        <h1 className="text-[22px] md:text-2xl mb-2">Verifique seu email</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enviamos um link para redefinir sua senha. Verifique sua caixa de
          entrada ou a pasta de spam.
        </p>

        {/* 🚀 Agora só redireciona quando o usuário clicar */}
        <Button className="h-12 w-full" onClick={() => router.push("/login")}>
          Início
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[400px] md:border-2 border-[#F8F8F6] rounded-[10px] py-[60px] px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4 md:px-2"
      >
        <h1 className="text-[22px] md:text-2xl text-center">
          Recuperação de senha
        </h1>

        <Input.Root className="mt-8">
          <Input.Prefix>
            <Input.Field
              type="text"
              placeholder="E-mail"
              disabled={isPending}
              {...register("email")}
            />
          </Input.Prefix>
          <Input.ErrorMessages errorMessage={errors.email?.message} />
        </Input.Root>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 h-12"
          variant={isPending ? "disabled" : "default"}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Enviar"}
        </Button>

        <Button
          type="button"
          variant="link"
          className="text-sm text-right self-end"
          onClick={() => history.back()}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
}
