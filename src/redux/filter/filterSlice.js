import { createSlice } from "@reduxjs/toolkit";
import { fetchFilterTeachers } from "./filterOperations";

const initialState = {
  teachers: [],
  language: "",
  level: "",
  priceMax: 1000,
  isLoading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterTeachers: (state, action) => {
      state.language = action.payload.language;
      state.level = action.payload.level;
      state.priceMax = action.payload.price;
      console.log(state.language, state.level, state.priceMax);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilterTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = Array.isArray(action.payload)
          ? [...state.teachers, ...action.payload]
          : [];
        // console.log(state.teachers);
      })
      .addCase(fetchFilterTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { filterTeachers } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
