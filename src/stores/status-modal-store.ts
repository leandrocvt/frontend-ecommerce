import { create } from "zustand"

type ModalType = "success" | "error" | "warning" | "info"

interface StatusModalState {
  isOpen: boolean
  icon: ModalType
  title: string
  description?: string
  duration?: number
  textRedirect?: boolean
  openModal: (data: {
    icon: ModalType
    title: string
    description?: string
    duration?: number
    textRedirect?: boolean
  }) => void
  closeModal: () => void
}

export const useStatusModalStore = create<StatusModalState>((set) => ({
  isOpen: false,
  icon: "info",
  title: "",
  description: "",
  duration: 3000,
  textRedirect: false,

  openModal: (data) =>
    set({
      isOpen: true,
      ...data,
    }),

  closeModal: () => set({ isOpen: false }),
}))
