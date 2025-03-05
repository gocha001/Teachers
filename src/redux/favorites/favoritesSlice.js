import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites:[],
} 

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.favorites.some((fav) => fav.id === item.id);
      if (!exists) {
        state.favorites.push(item);
      }
      console.log(state.favorites);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
      console.log(state.favorites);
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;