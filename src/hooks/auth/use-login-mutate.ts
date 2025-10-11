"use client";

import { toast } from "sonner";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { decodeJwt } from "@/lib";
import { useRouter } from "next/navigation";
import { postDataLogin } from "@/services/auth";
import { homeByRole } from "@/middleware/config";
import { useMutation } from "@tanstack/react-query";
import { TOAST_STYLES } from "@/lib/toastStyles";

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
      if (decoded) {
        const now = Math.floor(Date.now() / 1000);
        const days = Math.max(0.01, (decoded.exp - now) / (60 * 60 * 24));
        Cookies.set("token", jwtToken, {
          secure: true,
          sameSite: "Strict",
          expires: days,
        });
      }
    },
    onError: (error) => {
      const apiMessage = error.response?.data?.error; 
      const description = getFriendlyErrorMessage(apiMessage);

      toast.error("Login Inválido", {
        description,
        style: TOAST_STYLES.error,
      });
    },
  });

  return { mutate, isPending };
}