import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "@/interface/product.interface";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
  }

  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
};

const saveCartToStorage = (cart: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
};

const initialState: CartState = loadCartFromStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          position: state.items.length,
        });
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      saveCartToStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      state.items.forEach((item, index) => {
        item.position = index;
      });

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      saveCartToStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      saveCartToStorage(state);
    },

    reorderCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;

      state.items.forEach((item, index) => {
        item.position = index;
      });

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  reorderCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
