import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    email: "",
    password: "",
    avatarColor: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeAvatar: (state, action) => {
      state.userData.avatarColor = action.payload;
    },
    changeName: (state, action) => {
      state.userData.name = action.payload;
    },
  },
});

export const { changeAvatar, changeName } = profileSlice.actions;
export default profileSlice.reducer;
