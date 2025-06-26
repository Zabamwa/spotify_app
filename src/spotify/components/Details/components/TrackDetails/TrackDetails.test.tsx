import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Track } from "../../../../../types/types";

vi.mock("../../../Search/Search", () => ({
  getImageUrl: vi.fn(() => "img.png"),
}));
vi.mock("../../../FavoriteButton/FavoriteButton", () => ({
  FavoriteButton: ({ id }: { id: string }) => <button>Fav {id}</button>,
}));

import { TrackDetails } from "./TrackDetails";

describe("TrackDetails", () => {
  const track: Track = {
    id: "t1",
    name: "Track One",
    type: "track",
    artists: [
      { id: "a1", name: "Artist A", type: "artist" },
      { id: "a2", name: "Artist B", type: "artist" },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders track name and artists", () => {
    render(<TrackDetails track={track} />);
    expect(screen.getByTestId("details-title")).toHaveTextContent("Track One");
    expect(screen.getByTestId("details-artist")).toHaveTextContent(
      "Artist A, Artist B",
    );
  });

  it("renders image with getImageUrl", () => {
    render(<TrackDetails track={track} />);
    const img = screen.getByTestId("details-img");
    expect(img).toHaveAttribute("src", "img.png");
    expect(img).toHaveAttribute("alt", "Track One");
  });

  it("renders FavoriteButton with correct props", () => {
    render(<TrackDetails track={track} />);
    expect(screen.getByText("Fav t1")).toBeInTheDocument();
  });

  it("renders gracefully with empty artists", () => {
    const noArtists: Track = { ...track, artists: [] };
    render(<TrackDetails track={noArtists} />);
    expect(screen.getByTestId("details-artist")).toBeEmptyDOMElement();
  });
});
