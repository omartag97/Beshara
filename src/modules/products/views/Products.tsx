import { useEffect, useMemo } from "react";

import { useGetCategoriesQuery } from "@/redux/services/products";
import Toolbar from "@/shared/components/motion/Toolbar";
import Typography from "@/shared/components/ui/Typography";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { parseAsString, useQueryState } from "nuqs";
import ProductList from "../components/ProductList";

export default function Products() {
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString
      .withOptions({
        history: "replace",
      })
      .withDefault(""),
  );

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const modifiedCategories = useMemo(
    () => ["all", ...categories],
    [categories],
  );

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory("all");
    }
  }, [categories, activeCategory]);

  const formatCategory = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container mx-auto px-8 md:px-12">
      <div className="mb-4 flex items-center justify-between">
        <Typography variant="h2" className="text-primary font-bold">
          Our Products
        </Typography>
      </div>

      {isCategoriesLoading ? (
        <div className="space-y-4">
          <Skeleton className="mb-4 h-12 w-full max-w-xs" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-lg border p-4 shadow-sm">
                <Skeleton className="mb-2 h-40 w-full" />
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <Typography variant="body1" className="font-medium text-gray-700">
                Filter by:
              </Typography>
            </div>

            <div className="relative ml-3 w-full max-w-xs">
              <Select
                value={activeCategory || ""}
                onValueChange={(value) => setActiveCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {modifiedCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {formatCategory(category)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeCategory && (
            <div className="mb-6">
              <ProductList />
            </div>
          )}
        </>
      )}

      <Toolbar />
    </div>
  );
}
