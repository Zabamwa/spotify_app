import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer, {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoriteSlice";
import { FavoriteButton } from "./FavoriteButton";
import type { RootState } from "../../../store/store";
import type { ContentType } from "../../../types/types";

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      favorites: favoriteReducer,
    },
    preloadedState: {
      favorites: {
        items: [],
        ...(preloadedState?.favorites ?? {}),
      },
    },
  });
};

const defaultProps = {
  id: "1",
  type: "album" as ContentType,
  name: "Test album",
  imageUrl: "img.png",
};

describe("FavoriteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows 'Add to favorites' when not a favorite", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <FavoriteButton {...defaultProps} />
      </Provider>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Dodaj do ulubionych");
    expect(screen.getByTitle("Dodaj do ulubionych")).toBeInTheDocument();
  });

  it("shows 'Favorite' and Star icon when item is favorited", () => {
    const store = setupStore({
      favorites: {
        items: [
          {
            id: "1",
            type: "album",
            name: "Test",
            imageUrl: "",
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <FavoriteButton {...defaultProps} />
      </Provider>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Ulubione");
    expect(screen.getByTitle("Usuń z ulubionych")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("dispatches addFavorite when clicked and not a favorite", () => {
    const store = setupStore();
    store.dispatch = vi.fn();
    render(
      <Provider store={store}>
        <FavoriteButton {...defaultProps} />
      </Provider>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(store.dispatch).toHaveBeenCalledWith(addFavorite(defaultProps));
  });

  it("dispatches removeFavorite when clicked and already favorited", () => {
    const store = setupStore({
      favorites: {
        items: [
          {
            id: "1",
            type: "album",
            name: "Test",
            imageUrl: "",
          },
        ],
      },
    });
    store.dispatch = vi.fn();
    render(
      <Provider store={store}>
        <FavoriteButton {...defaultProps} />
      </Provider>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(store.dispatch).toHaveBeenCalledWith(
      removeFavorite({ id: "1", type: "album" }),
    );
  });
});
