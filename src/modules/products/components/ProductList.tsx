import { memo } from "react";

import ProductGrid from "./ProductGrid";

import { useGetProductsByCategoryQuery } from "@/redux/services/products";

import { parseAsString, useQueryState } from "nuqs";

import { Skeleton } from "@/shared/components/ui/Skeleton";

import ProductAccordion from "./ProductAccordion";

const ProductList = memo(function ProductList() {
  const [activeCategory] = useQueryState(
    "category",
    parseAsString
      .withOptions({
        history: "replace",
      })
      .withDefault(""),
  );

  const { data: products = [], isLoading } = useGetProductsByCategoryQuery(
    activeCategory || "",
    {
      skip: !activeCategory,
    },
  );

  return activeCategory === "all" ? (
    <ProductAccordion />
  ) : isLoading ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-80 rounded-lg border p-4 shadow-sm">
          <Skeleton className="mb-2 h-40 w-full" />
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  ) : (
    <ProductGrid products={products} />
  );
});

export default ProductList;
