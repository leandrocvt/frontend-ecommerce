import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putDataUpdatePassword } from "@/services/user";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { ApiErrorResponse } from "@/types/api";
import Cookies from "js-cookie";
import { useLoadingStore } from "@/stores";

function getFriendlyErrorMessage(status?: number, apiMessage?: string) {
  if (status === 401) return "Senha atual incorreta";
  if (status === 404) return "Usuário não encontrado";
  if (status === 500) return "Erro interno do servidor";
  return apiMessage || "Erro ao atualizar senha";
}

export function useUpdatePasswordMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: putDataUpdatePassword,
    retry: 0,
    onMutate: () => {
      showLoading();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["userProfile"] });
      Cookies.remove("token");

      toast.success("Senha atualizada com sucesso!", {
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
