import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Details } from "./Details";

let params: { type?: string; id?: string } = {};
const navigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useParams: () => params,
    useNavigate: () => navigate,
  };
});

const mockAlbum = { id: "1", name: "Test Album" };
const mockArtist = { id: "2", name: "Test Artist" };
const mockTrack = { id: "3", name: "Test Track" };

const useGetAlbumQuery = vi.fn();
const useGetArtistQuery = vi.fn();
const useGetTrackQuery = vi.fn();

vi.mock("../../spotifyAPI", () => ({
  useGetAlbumQuery: (...args: unknown[]) => useGetAlbumQuery(...args),
  useGetArtistQuery: (...args: unknown[]) => useGetArtistQuery(...args),
  useGetTrackQuery: (...args: unknown[]) => useGetTrackQuery(...args),
}));

vi.mock("./components/AlbumDetails/AlbumDetails", () => ({
  AlbumDetails: ({ album }: { album: typeof mockAlbum }) => (
    <div data-testid="album-details">{album.name}</div>
  ),
}));
vi.mock("./components/ArtistDetails/ArtistDetails", () => ({
  ArtistDetails: ({ artist }: { artist: typeof mockArtist }) => (
    <div data-testid="artist-details">{artist.name}</div>
  ),
}));
vi.mock("./components/TrackDetails/TrackDetails", () => ({
  TrackDetails: ({ track }: { track: typeof mockTrack }) => (
    <div data-testid="track-details">{track.name}</div>
  ),
}));

beforeEach(() => {
  params = { type: "album", id: "1" };
  navigate.mockClear();
  useGetAlbumQuery.mockReset();
  useGetArtistQuery.mockReset();
  useGetTrackQuery.mockReset();

  useGetAlbumQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
  });
  useGetArtistQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
  });
  useGetTrackQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: null,
  });
});
afterEach(() => {
  vi.clearAllMocks();
});

describe("Details component", () => {
  it("shows error if type or id is missing", () => {
    params = { type: "", id: undefined };
    render(<Details />);
    expect(screen.getByText(/błąd!/i)).toBeInTheDocument();
  });

  it("shows unsupported type", () => {
    params = { type: "xxx", id: "y" };
    render(<Details />);
    expect(screen.getByText(/nieobsługiwany typ/i)).toBeInTheDocument();
  });

  it("shows loading if any isLoading is true", () => {
    useGetAlbumQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    expect(screen.getByText(/ładowanie/i)).toBeInTheDocument();
  });

  it("shows error if any error is set", () => {
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: "fail",
      data: undefined,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    expect(screen.getByText(/błąd ładowania/i)).toBeInTheDocument();
  });

  it("shows no data if all data are missing", () => {
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    expect(screen.getByText(/brak danych/i)).toBeInTheDocument();
  });

  it("renders album details for album type", () => {
    params = { type: "album", id: "1" };
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockAlbum,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    expect(screen.getByTestId("album-details")).toHaveTextContent("Test Album");
  });

  it("renders artist details for artist type", () => {
    params = { type: "artist", id: "2" };
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockArtist,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    expect(screen.getByTestId("artist-details")).toHaveTextContent(
      "Test Artist",
    );
  });

  it("renders track details for track type", () => {
    params = { type: "track", id: "3" };
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockTrack,
    });
    render(<Details />);
    expect(screen.getByTestId("track-details")).toHaveTextContent("Test Track");
  });

  it("navigates back when BackButton clicked", () => {
    params = { type: "album", id: "1" };
    useGetAlbumQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockAlbum,
    });
    useGetArtistQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    useGetTrackQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    });
    render(<Details />);
    screen.getByText(/wróć/i).click();
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
