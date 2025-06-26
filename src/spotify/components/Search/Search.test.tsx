import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Search } from "./Search";
import favoriteReducer from "../../../store/slices/favoriteSlice";

let paramsObj: URLSearchParams;
const setSearchParams = vi.fn((obj) => {
  paramsObj = new URLSearchParams(Object.entries(obj));
});
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useSearchParams: () => [paramsObj, setSearchParams],
  };
});

const mockUseSearchQuery = vi.fn();
vi.mock("../../spotifyAPI", () => ({
  useSearchQuery: (...args: unknown[]) => mockUseSearchQuery(...args),
}));

vi.mock("../../../hooks/useDebounce", () => ({
  useDebounce: (v: string) => v,
}));

vi.mock("../FavoriteButton/FavoriteButton.tsx", () => ({
  FavoriteButton: ({
    id,
    type,
    name,
  }: {
    id: string;
    type: string;
    name: string;
  }) => (
    <button data-testid={`favorite-${id}`}>
      Fav-{type}-{name}
    </button>
  ),
}));

beforeEach(() => {
  paramsObj = new URLSearchParams("q=test&type=album");
  setSearchParams.mockClear();
  mockUseSearchQuery.mockReset();
  sessionStorage.clear();
});
afterEach(() => {
  vi.clearAllMocks();
});

const renderWithStore = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { favorites: favoriteReducer },
    preloadedState: { favorites: { items: [] } },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
};

describe("Search component", () => {
  it("renders input, select and loads data", () => {
    mockUseSearchQuery.mockReturnValue({
      data: {
        albums: { items: [{ id: "1", name: "Alb1", images: [{}] }] },
      },
      isLoading: false,
      error: null,
    });

    renderWithStore(<Search />);
    expect(screen.getByPlaceholderText(/wyszukaj/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Alb1")).toBeInTheDocument();
    expect(screen.getByText(/szczegóły/i)).toBeInTheDocument();
    expect(screen.getByTestId("favorite-1")).toBeInTheDocument();
  });

  it("shows loading when isLoading", () => {
    mockUseSearchQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    });
    renderWithStore(<Search />);
    expect(screen.getByText(/ładowanie/i)).toBeInTheDocument();
  });

  it("shows error when error occurs", () => {
    mockUseSearchQuery.mockReturnValue({
      isLoading: false,
      error: new Error("fail"),
      data: undefined,
    });
    renderWithStore(<Search />);
    expect(screen.getByText(/błąd/i)).toBeInTheDocument();
  });

  it("updates params on input change", async () => {
    mockUseSearchQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: { albums: { items: [] } },
    });
    renderWithStore(<Search />);
    const input = screen.getByPlaceholderText(/wyszukaj/i);
    fireEvent.change(input, { target: { value: "nowe" } });
    await waitFor(() =>
      expect(setSearchParams).toHaveBeenCalledWith({
        q: "nowe",
        type: "album",
      }),
    );
  });

  it("updates params on type change", async () => {
    mockUseSearchQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: { artists: { items: [] } },
    });
    renderWithStore(<Search />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "artist" } });
    await waitFor(() =>
      expect(setSearchParams).toHaveBeenCalledWith({
        q: "test",
        type: "artist",
      }),
    );
  });

  it("renders nothing if no data", () => {
    mockUseSearchQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    renderWithStore(<Search />);
    expect(screen.queryByText(/szczegóły/i)).not.toBeInTheDocument();
  });
});
