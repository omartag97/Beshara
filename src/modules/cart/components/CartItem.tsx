import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CartItem as CartItemType } from "@/interface/product.interface";
import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { Trash2, GripVertical } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/components/ui/Form";
import { Input } from "@/shared/components/ui/Input";
import {
  cartItemQuantitySchema,
  type CartItemQuantityFormValues,
} from "@/shared/validation/FormSchema";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const form = useForm<CartItemQuantityFormValues>({
    resolver: zodResolver(cartItemQuantitySchema),
    defaultValues: {
      quantity: item.quantity,
    },
    mode: "onChange",
  });

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.quantity && value.quantity !== item.quantity) {
        dispatch(updateQuantity({ id: item.id, quantity: value.quantity }));
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, form, item.id, item.quantity]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 flex items-center rounded-lg border p-4 shadow-sm ${isDragging ? "z-10 bg-gray-50 dark:bg-gray-800" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-3 cursor-grab touch-none"
        aria-label="Drag handle"
      >
        <GripVertical size={20} className="text-gray-400" />
      </div>

      <div className="h-16 w-16 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <Typography variant="body1" className="line-clamp-1 font-medium">
            {item.title}
          </Typography>
          <Typography variant="body1" className="text-primary font-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </div>

        <Typography variant="body2" className="text-gray-500">
          ${item.price.toFixed(2)} each
        </Typography>

        <div className="mt-2 flex items-center justify-between">
          <Form {...form}>
            <div className="flex items-center">
              <Typography variant="body2" className="mr-2">
                Qty:
              </Typography>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="mb-0">
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 1)
                        }
                        className="w-16 rounded border p-1 text-center text-sm"
                        aria-label="Quantity"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Form>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
