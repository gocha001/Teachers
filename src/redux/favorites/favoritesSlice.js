import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  addFavorite,
  deleteFavorite,
} from "./favoritesOperations";
import { logoutUser } from "../user/userOperations";

const initialState = {
  favorites: [],
  isLoading: false,
  error: null,
  page: 1,
  lastVisible: null,
  pageSize: 4,
  lastPage: false,
  lastKey: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.favorites = [];
      state.page = 1;
      state.lastVisible = null;
      state.lastPage = false;
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = Array.isArray(action.payload.favorites)
          ? [...state.favorites, ...action.payload.favorites]
          : [];
        state.lastKey = action.payload.lastKey;
        state.lastPage = action.payload.isLastPage;
        state.page += 1;
        state.lastVisible = action.payload.lastVisible;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          fetchFavorites.pending,
          addFavorite.pending,
          deleteFavorite.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFavorites.fulfilled,
          addFavorite.fulfilled,
          deleteFavorite.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchFavorites.rejected,
          addFavorite.rejected,
          deleteFavorite.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { resetFavorites } = favoritesSlice.actions;
