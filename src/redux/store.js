import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./user/userSlice.js";
import { teachersReducer } from "./teachers/teachersSlice.js";
import { filterReducer } from "./filter/filterSlice.js";
import { favoritesReducer } from "./favorites/favoritesSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const favoritesPersistConfig = {
  key: "favorite",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    filter: filterReducer,
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
