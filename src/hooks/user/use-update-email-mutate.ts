import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putDataUpdateEmail } from "@/services/user";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { ApiErrorResponse } from "@/types/api";
import Cookies from "js-cookie";
import { useLoadingStore } from "@/stores";

function getFriendlyErrorMessage(status?: number, apiMessage?: string) {
  if (status === 401) return "Senha incorreta";
  if (status === 404) return "Token inválido ou expirado";
  if (status === 409) return "E-mail já cadastrado";
  if (status === 500) return "Erro interno do servidor";
  return apiMessage || "Erro ao atualizar e-mail";
}

export function useUpdateEmailMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: putDataUpdateEmail,
    retry: 0,
    onMutate: () => {
      showLoading();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["userProfile"] });
      Cookies.remove("token");

      toast.success("E-mail atualizado com sucesso!", {
        style: TOAST_STYLES.success,
      });

      setTimeout(() => {
        hideLoading();
        router.replace("/login");
      }, 800);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      hideLoading();

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
