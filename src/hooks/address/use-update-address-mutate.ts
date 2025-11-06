"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putUpdateAddress } from "@/services/address/update-address";
import { TOAST_STYLES } from "@/lib/toast-styles";
import { ApiErrorResponse } from "@/types/api";
import { useLoadingStore } from "@/stores";
import { AddressUserProfile } from "@/types/user";

interface UpdateAddressPayload {
  addressId: number;
  data: Omit<AddressUserProfile, "id">; // remove o id do corpo
}

export function useUpdateAddressMutate() {
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoadingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ addressId, data }: UpdateAddressPayload) =>
      putUpdateAddress(addressId, data),
    retry: 0,
    onMutate: showLoading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Endereço atualizado com sucesso!", {
        style: TOAST_STYLES.success,
      });

      hideLoading();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      hideLoading();

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao atualizar endereço.";

      toast.error(message, { style: TOAST_STYLES.error });
    },
  });

  return { mutate, isPending };
}
