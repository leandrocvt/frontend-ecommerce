"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product";
import { ProductFilters, ProductsPagination } from "@/types/product";

export function useProductsQuery(filters: ProductFilters) {
  return useQuery<ProductsPagination>({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });
}
