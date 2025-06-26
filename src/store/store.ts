import { configureStore } from "@reduxjs/toolkit";
import { spotifyAPI } from "../api/spotifyAPI.ts";
import favoriteReducer from "./slices/favoriteSlice.ts";
import authReducer from "./slices/authSlice.ts";

export const store = configureStore({
  reducer: {
    [spotifyAPI.reducerPath]: spotifyAPI.reducer,
    favorites: favoriteReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
