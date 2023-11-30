import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InititalFetch } from "../Types";

const initialState: InititalFetch = {
  items: [],
  status: null,
  isLoading: true,
  error: null,
};
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(
        "https://phoneparadise.netlify.app/.netlify/functions/index/products"
      );
      return { items: response.data, isLoading: false, error: null };
    } catch (error) {
      console.error(error);
      return { items: [], isLoading: false, error: error.message };
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "success";
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default productsSlice.reducer;
