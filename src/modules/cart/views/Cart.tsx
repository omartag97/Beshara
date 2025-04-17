import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import CartItem from "../components/CartItem";
import { CartItem as CartItemType } from "@/interface/product.interface";
import { reorderCart } from "@/redux/slices/cart";
import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { RootState } from "@/redux/store";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  const consolidatedItems = useMemo(() => {
    const itemMap = new Map();

    items.forEach((item: CartItemType) => {
      const existingItem = itemMap.get(item.id);

      if (existingItem) {
        itemMap.set(item.id, {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + (item.quantity || 1),
        });
      } else {
        itemMap.set(item.id, { ...item });
      }
    });

    return Array.from(itemMap.values());
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = consolidatedItems.findIndex(
          (item: CartItemType) => item.id === active.id,
        );
        const newIndex = consolidatedItems.findIndex(
          (item: CartItemType) => item.id === over.id,
        );

        const reordered = arrayMove(
          [...consolidatedItems],
          oldIndex,
          newIndex,
        ).map((item, index) => ({
          ...item,
          position: index,
        }));
        dispatch(reorderCart(reordered));
      }
    },
    [consolidatedItems, dispatch],
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 text-center">
        <div className="flex flex-col items-center justify-center rounded-lg border p-12 shadow-sm">
          <ShoppingBag size={64} className="mb-4 text-gray-300" />
          <Typography variant="h3" className="mb-2">
            Your cart is empty
          </Typography>
          <Typography variant="body1" className="mb-6">
            Start shopping to add products to your cart
          </Typography>
          <Button onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button
          onClick={() => navigate("/products")}
          variant="ghost"
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" /> Continue Shopping
        </Button>
        <Typography variant="h3" className="font-bold">
          My Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-4 rounded-lg p-3">
            <Typography variant="body2" className="text-gray-600 italic">
              Drag items to reorder your cart
            </Typography>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={consolidatedItems.map((item: CartItemType) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {consolidatedItems.map((item: CartItemType) => (
                <CartItem key={item.id} item={item} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className="rounded-lg border p-4 shadow-sm">
          <Typography variant="h5" className="mb-4 font-bold">
            Order Summary
          </Typography>

          <div className="space-y-2 border-b pb-4">
            <div className="flex justify-between">
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2" className="font-medium">
                ${totalPrice.toFixed(2)}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2" className="font-medium">
                $0.00
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2" className="font-medium">
                $0.00
              </Typography>
            </div>
          </div>

          <div className="mt-4 mb-4 flex justify-between">
            <Typography variant="body1" className="font-bold">
              Total
            </Typography>
            <Typography variant="body1" className="text-primary font-bold">
              ${totalPrice.toFixed(2)}
            </Typography>
          </div>

          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
