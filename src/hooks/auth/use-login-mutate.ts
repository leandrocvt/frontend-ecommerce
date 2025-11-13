"use client";

import { toast } from "sonner";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { decodeJwt } from "@/lib";
import { useRouter } from "next/navigation";
import { postDataLogin } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { COOKIE_AUTH, homeByRole } from "@/middleware/config";

function getFriendlyErrorMessage(apiMessage?: string) {
  switch (apiMessage) {
    case "Invalid credentials":
      return "Email ou senha incorretos";
    default:
      return "Ocorreu um erro inesperado";
  }
}

export function useLoginMutate() {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    string,
    AxiosError<{ error: string }>,
    { email: string; password: string }
  >({
    mutationFn: postDataLogin,
    retry: 0,

    onSuccess: (jwtToken) => {
      const decoded = decodeJwt(jwtToken);

      if (!decoded) {
        toast.error("Erro ao validar o token recebido.", {
          style: TOAST_STYLES.error,
        });
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      const days = Math.max(0.01, (decoded.exp - now) / (60 * 60 * 24));

      Cookies.set(COOKIE_AUTH, jwtToken, {
        secure: true,
        sameSite: "Strict",
        expires: days,
      });

      const redirectTo = homeByRole(decoded.role);

      toast.success("Login realizado com sucesso!", {
        description: "Bem-vindo de volta 👋",
        style: TOAST_STYLES.success,
      });

      setTimeout(() => {
        router.replace(redirectTo);
      }, 1000);
    },

    onError: (error) => {
      const apiMessage = error.response?.data?.error;
      const description = getFriendlyErrorMessage(apiMessage);

      toast.error("Erro ao fazer login", {
        description,
        style: TOAST_STYLES.error,
      });
    },
  });

  return { mutate, isPending };
}
