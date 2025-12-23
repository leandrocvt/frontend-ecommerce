// page.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { useProductsQuery } from "@/hooks/product/use-product-query";
import { ProductCard } from "@/components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { ProductSearch } from "@/components/product-search";
import { ProductSort } from "@/components/product-sort";
import { ProductSort as ProductSortType } from "@/types/product";
import { ProductFiltersSheet } from "@/components/product-filters";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState<string | undefined>();
  const [sort, setSort] = useState<ProductSortType>("relevance");

  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleSearch = useCallback((value?: string) => {
    setPage(0);
    setName(value);
  }, []);

  const handleSortChange = useCallback((value: ProductSortType) => {
    setPage(0);
    setSort(value);
  }, []);

  const filters = useMemo(
    () => ({
      page,
      pageSize: 12,
      name,
      sort,
      categoryId,
      size,
      minPrice,
      maxPrice,
    }),
    [page, name, sort, categoryId, size, minPrice, maxPrice]
  );

  const { data, isLoading } = useProductsQuery(filters);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Todos os produtos</h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <ProductSearch onSearch={handleSearch} />

        <div className="flex gap-2">
          <ProductSort value={sort} onChange={handleSortChange} />

          <ProductFiltersSheet
            categoryId={categoryId}
            size={size}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={(value) => {
              setPage(0);
              setCategoryId(value);
            }}
            onSizeChange={(value) => {
              setPage(0);
              setSize(value);
            }}
            onPriceChange={(min, max) => {
              setPage(0);
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>
      </div>

      {isLoading && <p className="text-sm">Carregando...</p>}

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {data?.content.map((product) => (
          <ProductCard key={product.id} product={product} variant="admin" />
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(p - 1, 0));
                }}
              />
            </PaginationItem>

            {Array.from({ length: data.totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => (p + 1 < data.totalPages ? p + 1 : p));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
