import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../../../store/slices/favoriteSlice";
import { FavoritesNav } from "./FavoritesNav";
import { MemoryRouter } from "react-router-dom";
import type { ContentType } from "../../../types/types.ts";

const setupStore = (count: number = 0) => {
  const allowedTypes: ContentType[] = ["album", "artist", "track"];
  return configureStore({
    reducer: { favorites: favoriteReducer },
    preloadedState: {
      favorites: {
        items: Array.from({ length: count }, (_, i) => ({
          id: `id${i}`,
          type: allowedTypes[i % allowedTypes.length],
          name: `Item ${i}`,
          imageUrl: "",
        })),
      },
    },
  });
};

describe("FavoritesNav", () => {
  it("renders a link with Ulubione text and heart icon", () => {
    const store = setupStore(0);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesNav />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Ulubione")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/favorites");
    expect(screen.getByTestId("lucide-icon")).toBeInTheDocument();
  });

  it("shows correct count of favorites", () => {
    const store = setupStore(7);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesNav />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("shows 0 when there are no favorites", () => {
    const store = setupStore(0);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesNav />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
