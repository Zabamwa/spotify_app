import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../../../store/slices/favoriteSlice";
import { Favorites } from "./Favorites";
import type { RootState } from "../../../store/store";
import type { Favorite } from "../../../types/types";
import { MemoryRouter } from "react-router-dom";

let mockNavigate: ReturnType<typeof vi.fn>;
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

const mockFavorites: Favorite[] = [
  {
    id: "album1",
    type: "album",
    name: "Album One",
    imageUrl: "album1.png",
  },
  {
    id: "artist1",
    type: "artist",
    name: "Artist One",
    imageUrl: "artist1.png",
  },
  {
    id: "track1",
    type: "track",
    name: "Track One",
    imageUrl: "track1.png",
  },
];

vi.mock("../FavoriteButton/FavoriteButton.tsx", () => ({
  FavoriteButton: ({ id }: { id: string }) => <button>Fav {id}</button>,
}));

describe("Favorites component", () => {
  beforeEach(() => {
    mockNavigate = vi.fn();
    sessionStorage.clear();
  });

  it("renders with empty state for each tab", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Ulubione")).toBeInTheDocument();
    expect(
      screen.getByText("Brak ulubionych w tej kategorii."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Artyści"));
    expect(
      screen.getByText("Brak ulubionych w tej kategorii."),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Utwory"));
    expect(
      screen.getByText("Brak ulubionych w tej kategorii."),
    ).toBeInTheDocument();
  });

  it("shows correct cards for each tab", () => {
    const store = setupStore({
      favorites: {
        items: mockFavorites,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Album One")).toBeInTheDocument();
    expect(screen.queryByText("Artist One")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Artyści"));
    expect(screen.getByText("Artist One")).toBeInTheDocument();
    expect(screen.queryByText("Album One")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Utwory"));
    expect(screen.getByText("Track One")).toBeInTheDocument();
    expect(screen.queryByText("Artist One")).not.toBeInTheDocument();
  });

  it("shows total count in header", () => {
    const store = setupStore({
      favorites: {
        items: mockFavorites,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/3 wszystkich/)).toBeInTheDocument();
  });

  it("navigates to last search from sessionStorage when BackButton clicked", () => {
    const store = setupStore();
    sessionStorage.setItem("lastSearchUrl", "/?q=abc&type=album");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /strona główna/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/?q=abc&type=album");
  });

  it("navigates to / when no lastSearchUrl in sessionStorage", () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /strona główna/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
