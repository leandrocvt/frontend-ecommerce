"use client";

import { useState } from "react";
import { toast } from "sonner";
import { fetchCep, ViaCepResponse } from "@/services/address";
import { TOAST_STYLES } from "@/lib/toast-styles";

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function useFetchCep() {
  const [loading, setLoading] = useState(false);

  async function searchCep(zipCode: string): Promise<ViaCepResponse | null> {
    try {
      setLoading(true);
      const data = await fetchCep(zipCode);
      return data;
    } catch (error: unknown) {
      let message = "Erro ao buscar CEP.";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else if (isErrorWithMessage(error)) {
        message = error.message;
      }

      toast.error(message, { style: TOAST_STYLES.error });
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { searchCep, loading };
}
