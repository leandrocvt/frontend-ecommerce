"use client";

import { useState } from "react";
import { useProductsQuery } from "@/hooks/product/use-product-query";
import { ProductCard } from "@/components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
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

  const { data, isLoading } = useProductsQuery({
    page,
    pageSize: 12,
    name,
    sort,
    categoryId,
    size,
    minPrice,
    maxPrice,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Todos os produtos</h1>

      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <ProductSearch
          onSearch={(value) => {
            setPage(0);
            setName(value);
          }}
        />

        <div className="flex gap-2">
          <ProductSort
            value={sort}
            onChange={(value) => {
              setPage(0);
              setSort(value);
            }}
          />

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

      {/* PRODUCTS GRID */}
      <div
        className="
          grid gap-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-6
        "
      >
        {data?.content.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="admin"
          />
        ))}
      </div>

      {/* PAGINATION */}
      {data && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() =>
                  setPage((p) =>
                    p + 1 < data.totalPages ? p + 1 : p
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
