import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "@/redux/services/products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart";
import { ArrowLeft, ShoppingCart, Star, Tag } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import {
  productQuantitySchema,
  type ProductQuantityFormValues,
} from "@/shared/validation/FormSchema";
import { Input } from "@/shared/components/ui/Input";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<ProductQuantityFormValues>({
    resolver: zodResolver(productQuantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductQuery(id ? parseInt(id, 10) : 0, { skip: !id });

  const onSubmit = (values: ProductQuantityFormValues) => {
    if (product) {
      for (let i = 0; i < values.quantity; i++) {
        dispatch(addToCart(product));
      }
      enqueueSnackbar(
        `Added ${values.quantity} item${values.quantity > 1 ? "s" : ""} to cart!`,
        {
          variant: "success",
        },
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8 text-center">
        <Typography variant="h4" className="text-red-500">
          Error loading product details.
        </Typography>
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">
          <ArrowLeft size={16} className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Button onClick={() => navigate(-1)} variant="ghost" className="mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to products
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg p-8 shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-auto object-contain"
          />
        </div>

        <div className="space-y-4">
          <Typography variant="h2" className="font-bold">
            {product.title}
          </Typography>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500">
              <Star size={18} className="fill-current" />
              <Typography variant="body1" className="ml-1">
                {product.rating.rate}
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-500">
              ({product.rating.count} reviews)
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Tag size={18} />
            <Typography variant="body1" className="capitalize">
              {product.category}
            </Typography>
          </div>

          <Typography variant="h3" className="text-primary font-bold">
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" className="text-gray-700">
            {product.description}
          </Typography>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4">
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-20">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 1)
                          }
                          className="mt-1 block w-full rounded-md border p-2 shadow-sm sm:text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="mt-auto flex items-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
