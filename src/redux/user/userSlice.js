import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "./userOperations";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(registerUser.pending, (state) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.user = action.payload;
              console.log("Зареєстровано:", state.user);
          })
          .addCase(registerUser.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
          })

          .addCase(loginUser.pending, (state) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.user = action.payload;
              console.log("Увійшов користувач:", state.user);
          })
          .addCase(loginUser.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
          })

          .addCase(logoutUser.pending, (state) => {
              state.isLoading = true;
              state.error = null;
          })
          .addCase(logoutUser.fulfilled, (state) => {
              state.isLoading = false;
              state.user = null;
              console.log("Вийшов із системи");
          })
          .addCase(logoutUser.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload;
          });
  },
});

export const authReducer = authSlice.reducer;
