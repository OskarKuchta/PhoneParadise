import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../Types/Types";

const initialState: LoginState = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    password: "",
    avatarColor: "",
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
  },
});

export const { login, logout, changeName, changeAvatar } = loginSlice.actions;
export default loginSlice.reducer;
