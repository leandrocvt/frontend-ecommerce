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

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<ProductSortType>("relevance");

  const { data, isLoading } = useProductsQuery({
    page,
    pageSize: 12,
    name,
    sort,
  });

  return (
    <div>
      <h1 className="text-xl font-medium">Todos os produtos</h1>

      <div className="flex flex-col sm:flex-row gap-4 my-5 justify-between">
        <ProductSearch
          onSearch={(value) => {
            setPage(0);
            setName(value);
          }}
        />

        <ProductSort
          value={sort}
          onChange={(value) => {
            setPage(0);
            setSort(value);
          }}
        />
      </div>

      {isLoading && <p className="text-sm">Carregando...</p>}

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
          <ProductCard key={product.id} product={product} variant="admin" />
        ))}
      </div>

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
                  setPage((p) => (p + 1 < data.totalPages ? p + 1 : p))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
