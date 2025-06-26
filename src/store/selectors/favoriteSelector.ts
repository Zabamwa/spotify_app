import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectFavoritesItems = (state: RootState) => state.favorites.items;

export const selectFavoritesByType = createSelector(
  [selectFavoritesItems, (_: RootState, type: string) => type],
  (items, type) => items.filter((item) => item.type === type),
);
