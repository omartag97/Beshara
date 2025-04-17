import { memo, useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "@/redux/services/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/Accordion";
import Typography from "@/shared/components/ui/Typography";
import ProductGrid from "./ProductGrid";
import { Skeleton } from "@/shared/components/ui/Skeleton";

const ProductAccordion = memo(function ProductAccordion() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState<string[]>([]);

  const formatCategory = (category: string) =>
    category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: products = [], isFetching } = useGetProductsByCategoryQuery(
    activeCategory || "",
    {
      skip: !activeCategory,
    },
  );

  useEffect(() => {
    if (activeCategory) {
      setLoadingCategories((prev) => [...prev, activeCategory]);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (!isFetching && activeCategory) {
      setLoadingCategories((prev) =>
        prev.filter((cat) => cat !== activeCategory),
      );
    }
  }, [isFetching, activeCategory]);

  return (
    <Accordion
      className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      expandedValue={activeCategory}
      onValueChange={(value) => setActiveCategory(value as string | null)}
    >
      {categories.map((category) => (
        <AccordionItem key={category} value={category} className="py-2">
          <AccordionTrigger className="w-full cursor-pointer text-left text-zinc-950 dark:text-zinc-50">
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
            {loadingCategories.includes(category) || isFetching ? (
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
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
});

export default ProductAccordion;
