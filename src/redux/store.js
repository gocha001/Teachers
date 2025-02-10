import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./user/userSlice.js";
import { teachersReducer } from "./teachers/teachersSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
  },
});
