import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../Types/Types";

const initialState: LoginState = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    password: "",
    avatarColor: "",
    shopHistory: [],
  },
};

const loginSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = { name: "", email: "", password: "" };
    },
    changeAvatar: (state, action) => {
      state.userData.avatarColor = action.payload;
    },
    changeName: (state, action) => {
      state.userData.name = action.payload;
    },
    addShopHistory: (state, action) => {
      if(state.isLoggedIn) {
        if (!state.userData.shopHistory) {
          state.userData.shopHistory = [];
          state.userData.shopHistory.push({
            cartItems: action.payload,
            date: new Date(),
          });
      }
      state.userData.shopHistory.push({
        cartItems: action.payload,
        date: new Date(),
      });
    }
  },
  },
});

export const { login, logout, changeName, changeAvatar, addShopHistory } =
  loginSlice.actions;
export default loginSlice.reducer;
