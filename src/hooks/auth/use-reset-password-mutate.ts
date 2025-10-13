import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useStatusModalStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { putDataResetPassword } from "@/services/auth";
import { TOAST_STYLES } from "@/lib/toastStyles";

function getFriendlyErrorMessage(status?: number, apiMessage?: string) {
  if (status === 400) return "Token inválido ou expirado";
  if (status === 404) return "Usuário não encontrado";
  if (status === 500) return "Erro interno do servidor";
  return apiMessage || "Erro ao redefinir senha";
}

export function useResetPasswordMutate() {
  const router = useRouter();
  const { openModal } = useStatusModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: putDataResetPassword,
    retry: 0,
    onSuccess: (data: { message: string }) => {
      openModal({
        icon: "success",
        title: "Senha redefinida",
        description: data.message,
        duration: 3000,
        textRedirect: false,
      });
      setTimeout(() => router.push("/login"), 3000);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const status = error.response?.status;
      const apiMessage = error.response?.data?.message;
      const message = getFriendlyErrorMessage(status, apiMessage);

      toast.error(message, {
        style: TOAST_STYLES.error,
      });
    },
  });

  return { mutate, isPending };
}
