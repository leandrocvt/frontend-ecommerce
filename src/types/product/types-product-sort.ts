export type ProductSort =
  | "relevance"
  | "highestPrice"
  | "lowestPrice"
  | "biggestDiscount";

export const PRODUCT_SORT_OPTIONS = [
  { value: "relevance", label: "Relevância" },
  { value: "highestPrice", label: "Maior preço" },
  { value: "lowestPrice", label: "Menor preço" },
  { value: "biggestDiscount", label: "Maior desconto" },
] as const;
