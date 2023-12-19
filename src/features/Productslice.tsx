import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { InititalFetch, SetProductsPayload } from "../Types/Types";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../assets/FirebaseConfig";

const initialState: InititalFetch = {
  items: [],
  status: null,
  isLoading: true,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (_, { dispatch }) => {
    try {
      const productsCollection = collection(db, "products");
      const unsubscribe = onSnapshot(productsCollection, (querySnapshot) => {
        const updatedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(
          setProducts({ items: updatedProducts, isLoading: false, error: null })
        );
      });
      const initialQuerySnapshot = await getDocs(productsCollection);
      const initialProductsData = initialQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        items: initialProductsData,
        isLoading: false,
        error: null,
        unsubscribe,
      };
    } catch (error) {
      console.error(error);
      return { items: [], isLoading: false, error: error.message };
    }
  }
);

export const setProducts = createAction<SetProductsPayload>("products/setProducts");

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      Object.assign(state, action.payload);
      state.status = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
