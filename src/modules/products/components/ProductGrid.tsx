import { memo } from "react";
import { Product } from "@/interface/product.interface";
import ProductCard from "./ProductCard";
import { HoverCursor } from "./HoverCursor";
import { useCursorTracking } from "../hooks/useCursorTracking";
import { AnimatedGroup } from "@/shared/components/motion/AnimatedGroup";

interface ProductGridProps {
  products: Product[];
  onRegisterCard?: (id: string, element: HTMLElement) => void;
}

const ProductGrid = memo(function ProductGrid({ products }: ProductGridProps) {
  const {
    registerElement: registerCard,
    handlePositionChange,
    hoveredId,
  } = useCursorTracking();

  return (
    <>
      <AnimatedGroup
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          },
          item: {
            hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1.2,
                type: "spring",
                bounce: 0.3,
              },
            },
          },
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRegister={(el) => registerCard(product.id.toString(), el)}
          />
        ))}
      </AnimatedGroup>

      <HoverCursor
        hoveredId={hoveredId}
        onPositionChange={handlePositionChange}
      />
    </>
  );
});

export default ProductGrid;
