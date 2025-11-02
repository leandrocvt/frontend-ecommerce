import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { putDataUpdateEmail } from "@/services/user";
import { TOAST_STYLES } from "@/lib/toastStyles";
import { ApiErrorResponse } from "@/types/api"; 

function getFriendlyErrorMessage(status?: number, apiMessage?: string) {
  if (status === 401) return "Senha incorreta";
  if (status === 404) return "Token inválido ou expirado";
  if (status === 409) return "E-mail já cadastrado";
  if (status === 500) return "Erro interno do servidor";
  return apiMessage || "Erro ao atualizar e-mail";
}

export function useUpdateEmailMutate() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: putDataUpdateEmail,
    retry: 0,
    onSuccess: (data: { message?: string }) => {
      toast.success(data.message || "E-mail atualizado com sucesso! Faça login novamente.", {
        style: TOAST_STYLES.success,
      });

      setTimeout(() => router.push("/login"), 3000);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => { 
      const status = error.response?.status;
      const apiMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.detail;

      const message = getFriendlyErrorMessage(status, apiMessage);

      toast.error(message, {
        style: TOAST_STYLES.error,
      });
    },
  });

  return { mutate, isPending };
}
