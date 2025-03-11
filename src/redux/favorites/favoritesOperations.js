import {
  ref,
  push,
  set,
  remove,
  get,
  query,
  orderByKey,
  startAt,
  limitToFirst,
} from "firebase/database";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../config/firebase.js";

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userId = state.auth?.user?.uid || auth.currentUser?.uid;
      if (!userId) return rejectWithValue("User not authenticated");

      const userFavoritesRef = ref(db, `favorites/${userId}`);
      const snapshot = await get(userFavoritesRef);

      if (snapshot.exists()) {
        const favorites = snapshot.val();
        const isDuplicate = Object.values(favorites).some(
          (fav) => fav.id === data.id
        );
        if (isDuplicate) {
          return rejectWithValue("This item is already in favorites");
        }
      }
      const newFavoriteRef = push(userFavoritesRef);
      await set(newFavoriteRef, data);

      return { id: newFavoriteRef.key, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (id, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return rejectWithValue("User not authenticated");

      const userFavoritesRef = ref(db, `favorites/${userId}`);
      const snapshot = await get(userFavoritesRef);

      if (!snapshot.exists()) {
        return rejectWithValue("No favorites found.");
      }

      let keyToDelete = null;
      const favorites = snapshot.val();

      Object.entries(favorites).forEach(([key, value]) => {
        if (value.id === id) {
          keyToDelete = key;
        }
      });

      if (!keyToDelete) {
        return rejectWithValue("Favorite not found.");
      }

      const favoriteRef = ref(db, `favorites/${userId}/${keyToDelete}`);
      await remove(favoriteRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { lastVisible, pageSize } = state.favorites;

    try {
      const userId = state.auth?.user?.uid || auth.currentUser?.uid;
      if (!userId) return rejectWithValue("User not authenticated");

      const userFavoritesRef = ref(db, `favorites/${userId}`);

      let q;

      if (lastVisible) {
        q = query(
          userFavoritesRef,
          orderByKey(),
          startAt(lastVisible),
          limitToFirst(pageSize + 1)
        );
      } else {
        q = query(userFavoritesRef, orderByKey(), limitToFirst(pageSize + 1));
      }

      const snapshot = await get(q);
      const data = snapshot.val();
      const keys = Object.keys(data);
      const newLastVisible = keys[keys.length - 1];

      const favorites = Object.entries(snapshot.val()).map(([id, data]) => ({
        id,
        ...data,
      }));

      const isLastPage = favorites.length < pageSize + 1;

      if (isLastPage) {
        return {
          favorites: [...favorites],
          lastVisible: newLastVisible,
          isLastPage: true,
        };
      } else {
        const validFavorites = favorites.slice(0, pageSize);

        return {
          favorites: [...validFavorites],
          lastVisible: newLastVisible,
          isLastPage: false,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
