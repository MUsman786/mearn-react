import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetail: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/shop/products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    console.log(filterParams, sortParams);
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `http://localhost:8000/api/shop/products/get?${query}`
    );
    // console.log(response.data)
    return response?.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "/shop/products/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/products/detail/${id}`
    );
    return response?.data;
  }
);
const shoppingProductSlice = createSlice({
  name: "shoppingProductSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload.data);
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productDetail = action.payload.data);
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        (state.isLoading = false), (state.productDetail = null);
      });
  },
});
export default shoppingProductSlice.reducer;
