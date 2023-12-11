import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../Types/Types";

const initialState: LoginState = {
  isLoggedIn: false,
  userData: {
    name: "",
    email: "",
    password: "",
    avatarColor: "bg-emerald-500",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    changeAvatar: (state, action) => {
      state.userData.avatarColor = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = { name: "", email: "", password: "" };
    },
  },
});

export const { login, logout, changeAvatar } = loginSlice.actions;
export default loginSlice.reducer;
