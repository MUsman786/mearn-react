import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  isLoading: false,
};

export const getCartItem = createAsyncThunk(
  "/shop/cart/getCartItem",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ userId, productId, quantity }) => {
    // Wrap parameters in an object
    const response = await axios.post(
      `http://localhost:8000/api/shop/cart/add`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const UpdatedCartItem = createAsyncThunk(
  "/shop/cart/UpdatedCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.update(
      `http://localhost:8000/api/shop/cart/Update`,
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const deletCartItems = createAsyncThunk(
  "/shop/cart/deletCartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cart = action.payload.data);
      })
      .addCase(getCartItem.rejected, (state) => {
        (state.isLoading = false), (state.cart = []);
      })
      .addCase(UpdatedCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdatedCartItem.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cart = action.payload.data);
      })
      .addCase(UpdatedCartItem.rejected, (state) => {
        (state.isLoading = false), (state.cart = []);
      })
      .addCase(deletCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cart = action.payload.data);
      })
      .addCase(deletCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cart = []);
      })
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cart = action.payload.data);
      })
      .addCase(addCartItem.rejected, (state) => {
        (state.isLoading = false), (state.cart = []);
      });
  },
});

export default CartSlice.reducer;
