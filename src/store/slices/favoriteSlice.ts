import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Favorite } from "../../types/types.ts";

type State = {
  items: Favorite[];
};

const initialState: State = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      if (
        !state.items.some(
          (item) =>
            item.id === action.payload.id && item.type === action.payload.type,
        )
      ) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (
      state,
      action: PayloadAction<Pick<Favorite, "id" | "type">>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.type === action.payload.type),
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
