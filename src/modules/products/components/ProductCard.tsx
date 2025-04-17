import { forwardRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Product } from "@/interface/product.interface";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/shared/components/motion/MorphingDialog";

import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useSnackbar } from "notistack";

interface ProductCardProps {
  product: Product;
  onRegister?: (element: HTMLElement) => void;
}

const ProductCardComponent = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product }) => {
    const { id, title, price, category, image, rating, description } = product;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleViewDetails = () => {
      navigate(`/products/${id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(
        addToCart({
          id,
          title,
          price,
          category,
          image,
          rating,
          description: description || "",
        }),
      );
      enqueueSnackbar("Product added to cart!", { variant: "success" });
    };

    return (
      <MorphingDialog>
        <MorphingDialogTrigger className="bg-accent flex flex-col overflow-hidden dark:bg-zinc-900">
          <div
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border shadow-md"
            data-morphing-id={id.toString()}
          >
            {image ? (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-contain p-4 transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundPosition: "center" }}
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center bg-gray-100">
                <Skeleton className="h-28 w-28" />
              </div>
            )}
            <div className="flex grow flex-col p-4">
              <div className="mb-2 flex-grow">
                <Typography variant="h6" className="line-clamp-2">
                  {title}
                </Typography>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Typography
                    variant="h5"
                    className="text-primary font-semibold"
                  >
                    ${price.toFixed(2)}
                  </Typography>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <Typography variant="body2">
                      {rating.rate} ({rating.count})
                    </Typography>
                  </div>
                </div>
                <Typography variant="body2" className="text-gray-500">
                  {category}
                </Typography>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-grow"
                  onClick={handleViewDetails}
                >
                  Details <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="default" size="icon" onClick={handleAddToCart}>
                  <ShoppingCart size={16} />
                </Button>
              </div>
            </div>
          </div>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent className="bg-accent pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border sm:w-[500px] dark:bg-zinc-900">
            <MorphingDialogClose />
            <MorphingDialogImage
              src={image}
              alt={title}
              className="h-60 w-full object-contain p-4"
            />
            <div className="space-y-2 p-4">
              <MorphingDialogTitle>{title}</MorphingDialogTitle>
              <MorphingDialogSubtitle>
                ${price.toFixed(2)}
              </MorphingDialogSubtitle>
              <MorphingDialogDescription>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span>
                    {rating.rate} ({rating.count} reviews)
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" onClick={handleViewDetails}>
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </MorphingDialogDescription>
            </div>
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    );
  },
);

const ProductCard = memo(ProductCardComponent);
ProductCardComponent.displayName = "ProductCardComponent";
ProductCard.displayName = "ProductCard";

export default ProductCard;
