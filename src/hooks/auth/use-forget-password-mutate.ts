"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { postDataForgetPassword } from "@/services/auth";
import { useStatusModalStore } from "@/stores";

type ForgetPasswordResponse = { message: string };
type ForgetPasswordRequest = { email: string };

/**
 * Hook reutilizável para recuperação de senha
 * @param onSuccessCallback 
 */
export function useForgetPasswordMutate(onSuccessCallback?: () => void) {
  const { openModal } = useStatusModalStore();

  const { mutate, isPending } = useMutation<
    ForgetPasswordResponse,
    AxiosError<{ message: string }>,
    ForgetPasswordRequest
  >({
    mutationFn: postDataForgetPassword,
    retry: 0,
    onSuccess: (data) => {
      openModal({
        icon: "success",
        title: "Sucesso",
        description: data.message,
        duration: 3000,
        textRedirect: false,
      });

      // 🚀 só executa o que o componente quiser (não redireciona sozinho)
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Ocorreu um erro inesperado.";
      toast(message, {
        className: "sonner-toast--error",
      });
    },
  });

  return { mutate, isPending };
}
