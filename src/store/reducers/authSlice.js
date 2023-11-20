import { createSlice } from "@reduxjs/toolkit";
import { login, signup, logout } from "../../services/authenticate.service";

const userInfo = JSON.parse(localStorage.getItem("user"));
export const authSlice = createSlice({
  name: "auth",
  initialState: userInfo
    ? { isLoggedIn: true, userInfo, loading: false }
    : { isLoggedIn: false, userInfo: null, loading: false,message:null},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      // state.isLoggedIn = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.userInfo = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.message = payload;
    },
    [signup.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

//config store

export default authSlice.reducer;
