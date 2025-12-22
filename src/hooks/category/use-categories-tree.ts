"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesTree } from "@/services/category/category-service";

export function useCategoriesTree() {
  return useQuery({
    queryKey: ["categories-tree"],
    queryFn: getCategoriesTree,
    staleTime: 1000 * 60 * 10,
  });
}
