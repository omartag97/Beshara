import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/Accordion";

import { ChevronUp } from "lucide-react";
import { memo } from "react";
import Typography from "@/shared/components/ui/Typography";
import ProductGrid from "./ProductGrid";
import { useGetProductsByCategoryQuery } from "@/redux/services/products";
import { Product } from "@/interface/product.interface";

interface ProductAccordionProps {
  categories: string[];
  products: Product[];
  activeCategory: string;
}

const ProductAccordion = memo(function ProductAccordion({
  activeCategory,
  categories,
  products,
}: ProductAccordionProps) {
  const formatCategory = (category: string) =>
    category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Accordion
      className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {activeCategory === "all" ? (
        categories.map((category) => {
          const { data: categoryProducts = [], isLoading: isCategoryLoading } =
            useGetProductsByCategoryQuery(category);

          return (
            <AccordionItem key={category} value={category} className="py-2">
              <AccordionTrigger className="w-full text-left text-zinc-950 dark:text-zinc-50">
                <div className="flex items-center justify-between">
                  <Typography
                    variant="h4"
                    className="mb-4 font-semibold text-gray-800"
                  >
                    {formatCategory(category)}
                  </Typography>
                  <ChevronUp className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
                </div>
              </AccordionTrigger>

              <AccordionContent>
                {isCategoryLoading ? (
                  <div>Loading...</div>
                ) : (
                  <ProductGrid products={categoryProducts} />
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })
      ) : (
        <ProductGrid products={products} />
      )}
    </Accordion>
  );
});

export default ProductAccordion;
