"use client";

import { Loader2 } from "lucide-react";
import { useLoadingStore } from "@/stores";

export function GlobalLoader() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
    </div>
  );
}
