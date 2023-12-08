import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../Types/Types";

interface LoginState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userData: null,
};

const loginSlice = createSlice({
  name: "login",
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
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
