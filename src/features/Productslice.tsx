import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface initialState {
  items: string[];
  status: string;
  error: null | unknown;
}

const initialState: initialState = {
  items: [],
  status: null,
  error: null,
};

export const Fetch = createAsyncThunk(
  "products/Fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/products");
      return res?.json();
    } catch (error) {
      return rejectWithValue(error.res.json());
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Fetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(Fetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(Fetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
