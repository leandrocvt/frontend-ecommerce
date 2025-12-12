export interface ProductItem {
  id: number;
  name: string;
  basePrice: number;
  finalPrice: number;
  firstImageUrl: string;
}

export interface ProductsPagination {
  content: ProductItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ProductFilters {
  name?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}
