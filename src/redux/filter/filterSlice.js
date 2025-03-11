import { createSlice } from "@reduxjs/toolkit";

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
      state.priceMax = action.payload.priceMax;
      console.log(action.payload.language);
      console.log(action.payload.level);
      console.log(action.payload.priceMax);
      console.log(state.language, state.level, state.priceMax);
    },
  },
});

export const { filterTeachers } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
