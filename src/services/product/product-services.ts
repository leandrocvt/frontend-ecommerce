import axiosInstance from "@/config/axios.config";
import { ProductsPagination, ProductFilters } from "@/types/product";

export async function getProducts(filters: ProductFilters) {
  const response = await axiosInstance.get<ProductsPagination>("/products", {
    params: filters,
  });

  return response.data;
}
