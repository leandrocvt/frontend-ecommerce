import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchDataUpdateName } from "@/services/user";
import { TOAST_STYLES } from "@/lib/toastStyles";
import { ApiErrorResponse } from "@/types/api";
import { useLoadingStore } from "@/stores";

export function useUpdateNameMutate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: patchDataUpdateName,
    retry: 0,
    onMutate: showLoading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Nome atualizado com sucesso!", {
        style: TOAST_STYLES.success,
      });

      setTimeout(() => {
        hideLoading();
        router.replace("/user/account");
      }, 800);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      hideLoading();

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao atualizar nome";

      toast.error(message, { style: TOAST_STYLES.error });
    },
  });

  return { mutate, isPending };
}
