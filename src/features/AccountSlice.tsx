import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../Types/Types";

const initialState: LoginState = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    password: "",
    avatarColor: "",
    shopHistory: {},
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
      state.userData.shopHistory = action.payload;
      
    },
  },
});

export const { login, logout, changeName, changeAvatar, addShopHistory } =
  loginSlice.actions;
export default loginSlice.reducer;
