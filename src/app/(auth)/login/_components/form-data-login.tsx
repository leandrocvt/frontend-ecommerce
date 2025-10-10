"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components";
import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useLoginMutate } from "@/hooks/auth";
// import { ForgetPassword } from "./forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/types/auth";

export function FormDataLogin() {
  const { mutate, isPending } = useLoginMutate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [isForgetOpen, setIsForgetOpen] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="w-[400px] py-[60px] rounded-[10px] md:border-2 border-[#F8F8F6]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 px-10 "
      >
        <h1 className="text-2xl text-center">Olá, bem vindo de volta!</h1>
        <p className="text-center text-sm mx-6 ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>

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

        <Input.Root>
          <Input.Prefix>
            <Input.Field
              type="password"
              placeholder="Senha"
              disabled={isPending}
              {...register("password")}
            />
          </Input.Prefix>
          <Input.ErrorMessages errorMessage={errors.password?.message} />
        </Input.Root>

        <Button
          variant={"link"}
          type="button"
          className="flex flex-row-reverse h-3 font-normal text-start text-sm justify-start p-0 cursor-pointer"
          onClick={() => setIsForgetOpen(true)}
        >
          Esqueceu sua senha?
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-4 h-12"
          variant={isPending ? "disabled" : "default"}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>

        <Button
          type="button"
          disabled={isPending}
          className="h-12 bg-[#FFF] border border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Criar uma conta"
          )}
        </Button>
      </form>

      {isForgetOpen && (
        // <ForgetPassword onClose={() => setIsForgetOpen(false)} />
        <p>test</p>
      )}
    </div>
  );
}
