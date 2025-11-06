"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddAddress } from "@/services/address/add-address";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { ApiErrorResponse } from "@/types/api";
import { useLoadingStore } from "@/stores";

export function useAddAddressMutate() {
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: postAddAddress,
    retry: 0,
    onMutate: showLoading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Endereço adicionado com sucesso!", {
        style: TOAST_STYLES.success,
      });

      hideLoading();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      hideLoading();

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao adicionar endereço.";

      toast.error(message, { style: TOAST_STYLES.error });
    },
  });

  return { mutate, isPending };
}
