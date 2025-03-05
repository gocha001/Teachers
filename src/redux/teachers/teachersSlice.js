import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./teachersOperations.js";

const initialState = {
  teachers: [],
  isLoading: false,
  error: null,
  page: 1,
  lastVisible: " ",
  pageSize: 4,
  lastPage: false,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    resetTeachers: (state) => {
      state.teachers = [];
      state.page = 1;
      state.lastVisible = null;
      state.lastPage = false;
      state.pageSize = 4;
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("Action Payload:", action.payload);
        // state.teachers = action.payload;
        // state.teachers = [...state.teachers, ...action.payload.teachers];
        state.teachers = Array.isArray(action.payload.teachers)
          ? [...state.teachers, ...action.payload.teachers]
          : [];
        state.lastKey = action.payload.lastKey;
        // state.lastVisible = action.payload.lastVisible;
        state.lastPage = action.payload.isLastPage;
        state.page += 1;
        // console.log(state.teachers);
        // console.log(state.page);
        // console.log(state.lastPage);
        // console.log(state.lastVisible);
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
export const { resetTeachers } = teachersSlice.actions;
