"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "@/services/address/delete-address";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { ApiErrorResponse } from "@/types/api";
import { useLoadingStore } from "@/stores";

export function useDeleteAddressMutate() {
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (addressId: number) => deleteAddress(addressId),
    retry: 0,
    onMutate: showLoading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Endereço excluído com sucesso!", {
        style: TOAST_STYLES.success,
      });

      hideLoading();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      hideLoading();

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao excluir endereço.";

      toast.error(message, { style: TOAST_STYLES.error });
    },
  });

  return { mutate, isPending };
}
