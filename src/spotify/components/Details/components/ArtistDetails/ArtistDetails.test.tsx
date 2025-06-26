import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Artist } from "../../../../../types/types";

vi.mock("../../../Search/Search", () => ({
  getImageUrl: vi.fn(() => "img.png"),
}));
vi.mock("../../../FavoriteButton/FavoriteButton", () => ({
  FavoriteButton: ({ id }: { id: string }) => <button>Fav {id}</button>,
}));

import { ArtistDetails } from "./ArtistDetails";

describe("ArtistDetails", () => {
  const artist: Artist = {
    id: "a1",
    name: "Artist One",
    type: "artist",
    popularity: 73,
    genres: ["pop", "rock"],
    images: [{ url: "img.png" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders artist name, popularity and genres", () => {
    render(<ArtistDetails artist={artist} />);
    expect(screen.getByTestId("details-title")).toHaveTextContent("Artist One");
    expect(screen.getByTestId("details-meta")).toHaveTextContent(
      "Popularność: 73",
    );
    expect(screen.getByTestId("details-meta")).toHaveTextContent(
      "Gatunki: pop, rock",
    );
  });

  it("renders image with getImageUrl", () => {
    render(<ArtistDetails artist={artist} />);
    const img = screen.getByTestId("details-img");
    expect(img).toHaveAttribute("src", "img.png");
    expect(img).toHaveAttribute("alt", "Artist One");
  });

  it("renders FavoriteButton with correct props", () => {
    render(<ArtistDetails artist={artist} />);
    expect(screen.getByText("Fav a1")).toBeInTheDocument();
  });

  it("renders gracefully when genres are missing", () => {
    const noGenres: Artist = { ...artist, genres: undefined };
    render(<ArtistDetails artist={noGenres} />);
    expect(screen.getByTestId("details-meta")).toHaveTextContent(/Gatunki:/);
  });
});
