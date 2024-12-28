import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSLice from "./admin/products-slice";
import shoppingProductSlice from "./shop/product-slice";
import cartSlice from "./shop/cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSLice,
    shopProduct: shoppingProductSlice,
    cartItems: cartSlice,
  },
});

export default store;
