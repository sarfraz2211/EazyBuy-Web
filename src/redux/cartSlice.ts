import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/src/models/Product";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds a new product, or increases its quantity when it is already in the cart.
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(item => item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Changes quantity by +1 or -1 and removes an item when it reaches zero.
    changeQuantity(state, action: PayloadAction<{ id: string; amount: number }>) {
      const item = state.items.find(cartItem => cartItem._id === action.payload.id);
      if (!item) return;

      item.quantity += action.payload.amount;
      if (item.quantity <= 0) {
        state.items = state.items.filter(cartItem => cartItem._id !== action.payload.id);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, changeQuantity, removeFromCart, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
