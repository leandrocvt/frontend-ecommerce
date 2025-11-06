import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useStatusModalStore } from "@/stores";
import { postDataSignUp } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { TOAST_STYLES } from "@/lib/toast-styles";

export function useSignUpMutate() {
  const router = useRouter();
  const { openModal } = useStatusModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: postDataSignUp,
    retry: 0,

    onSuccess: (data: { message?: string }) => {
      toast.success("Conta criada com sucesso!", {
        description: data?.message || "Agora você já pode fazer login.",
        style: TOAST_STYLES.success,
      });

      openModal({
        icon: "success",
        title: "Sucesso",
        description: data?.message || "Cadastro realizado com sucesso!",
        duration: 3000,
        textRedirect: false,
      });

      setTimeout(() => {
        router.push("/login");
      }, 3200);
    },

    onError: (error: AxiosError<{ error?: string; message?: string }>) => {
      const backendMessage =
        error.response?.data?.error || error.response?.data?.message;
      const message = backendMessage || "Ocorreu um erro inesperado.";

      toast.error("Erro no cadastro", {
        description: message,
        style: TOAST_STYLES.error,
      });
    },
  });

  return { mutate, isPending };
}
