import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InititalFetch } from "../Types/Types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/FirebaseConfig";

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
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = [];
      
      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });

      return { items: productsData, isLoading: false, error: null };
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
