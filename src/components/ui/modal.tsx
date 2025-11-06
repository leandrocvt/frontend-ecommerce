"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "max-w-[950px]",
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <Dialog.Content
          className={`
            fixed left-1/2 top-1/2 z-50 w-[95%] ${maxWidth}
            -translate-x-1/2 -translate-y-1/2
            rounded-[12px] bg-white p-8 shadow-lg focus:outline-none

            /* 📱 Ajustes no mobile */
            sm:top-1/2 sm:-translate-y-1/2
            max-sm:top-[1%] max-sm:-translate-y-0 max-sm:h-auto 
            max-sm:overflow-y-auto max-sm:p-6
          `}
        >
          <Dialog.Title className="sr-only">{title || "Modal"}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {description || "Conteúdo do modal"}
          </Dialog.Description>
          <div className="flex items-center justify-between mb-6">
            {title && (
              <h2 className="text-[16px] font-medium text-gray-900">{title}</h2>
            )}
            <Dialog.Close asChild>
              <button
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label="Fechar modal"
              >
                <X size={20} className="cursor-pointer" />
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
