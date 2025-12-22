import axiosInstance from "@/config/axios.config";

export interface Category {
  id: number;
  name: string;
  children: Category[];
}

export async function getCategoriesTree() {
  const response = await axiosInstance.get<Category[]>("/categories/tree");
  return response.data;
}
