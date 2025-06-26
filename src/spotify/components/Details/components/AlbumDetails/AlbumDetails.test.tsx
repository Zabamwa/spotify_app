import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Album } from "../../../../../types/types";

vi.mock("../../../Search/Search", () => ({
  getImageUrl: vi.fn(() => "img.png"),
}));
vi.mock("../../../FavoriteButton/FavoriteButton", () => ({
  FavoriteButton: ({ id }: { id: string }) => <button>Fav {id}</button>,
}));

import { AlbumDetails } from "./AlbumDetails";

describe("AlbumDetails", () => {
  const album: Album = {
    id: "album1",
    name: "Best Album",
    type: "album",
    images: [{ url: "img.png" }],
    artists: [
      {
        id: "a1",
        name: "Artist One",
        type: "artist",
        popularity: 0,
        genres: [],
      },
      {
        id: "a2",
        name: "Artist Two",
        type: "artist",
        popularity: 0,
        genres: [],
      },
    ],
    release_date: "2020-01-01",
    tracks: {
      items: [
        {
          id: "t1",
          name: "Song 1",
          type: "track",
          artists: [],
          preview_url: "",
        },
        {
          id: "t2",
          name: "Song 2",
          type: "track",
          artists: [],
          preview_url: "",
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders album name, artists, release date and tracks", () => {
    render(<AlbumDetails album={album} />);
    expect(screen.getByTestId("details-title")).toHaveTextContent("Best Album");
    expect(screen.getByTestId("details-artist")).toHaveTextContent(
      "Artist One, Artist Two",
    );
    expect(screen.getByTestId("details-meta")).toHaveTextContent(
      "Data wydania: 2020-01-01",
    );
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();
  });

  it("renders image with getImageUrl", () => {
    render(<AlbumDetails album={album} />);
    const img = screen.getByTestId("details-img");
    expect(img).toHaveAttribute("src", "img.png");
    expect(img).toHaveAttribute("alt", "Best Album");
  });

  it("renders FavoriteButton with correct props", () => {
    render(<AlbumDetails album={album} />);
    expect(screen.getByText("Fav album1")).toBeInTheDocument();
  });

  it("renders empty artists, tracks and images gracefully", () => {
    const emptyAlbum: Album = {
      ...album,
      artists: [],
      tracks: { items: [] },
      images: [],
    };
    render(<AlbumDetails album={emptyAlbum} />);
    expect(screen.getByTestId("details-artist")).toBeEmptyDOMElement();
    expect(screen.getByTestId("track-list")).toBeEmptyDOMElement();
    expect(screen.getByTestId("details-img")).toHaveAttribute("src", "img.png");
  });
});
