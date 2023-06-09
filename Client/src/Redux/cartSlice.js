import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
  amount: 0,
  cartItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.quantity += 1;
      state.cartItem.push(action.payload);
      state.amount += action.payload.price * action.payload.quantity;
    },
    removeFromCart(state, action) {
      state.cartItem = state.cartItem.filter(
        (item) =>
          item.size !== action.payload.size ||
          item.color !== action.payload.color ||
          item.quantity !== action.payload.quantity
      );
      state.quantity -= 1;
      state.amount -= action.payload.price * action.payload.quantity;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].quantity -= 1;
        state.amount -= state.cartItem[itemIndex].price;

        if (state.cartItem[itemIndex].quantity === 0) {
          const nextCartItems = state.cartItem.filter(
            (item) => item.id !== action.payload.id
          );
          state.cartItem = nextCartItems;
          state.quantity -= 1;
        }
      }
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].quantity += 1;
        state.amount += state.cartItem[itemIndex].price;

        if (state.cartItem[itemIndex].quantity === 0) {
          const nextCartItems = state.cartItem.filter(
            (item) => item.id !== action.payload.id
          );
          state.cartItem = nextCartItems;
          state.quantity += 1;
        }
      }
    },
    clearCart(state) {
      state.cartItem = [];
      state.quantity = 0;
      state.amount = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
