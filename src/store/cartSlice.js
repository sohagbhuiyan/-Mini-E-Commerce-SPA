// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const getInitialCart = () => {
  const localData = localStorage.getItem("cart");
  return localData ? JSON.parse(localData) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(), // Sync with localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    increaseQuantity: (state, action) => {
  const item = state.items.find(i => i.productId === action.payload);
  if (item) item.quantity += 1;
},
decreaseQuantity: (state, action) => {
  const item = state.items.find(i => i.productId === action.payload);
  if (item && item.quantity > 1) item.quantity -= 1;
},
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
