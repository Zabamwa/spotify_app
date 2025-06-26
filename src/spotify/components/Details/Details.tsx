import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAlbumQuery,
  useGetArtistQuery,
  useGetTrackQuery,
} from "../../../api/spotifyAPI.ts";
import { Page } from "../../../App.styles";
import { BackButton } from "./Details.styles";
import type { Album, Artist, Track } from "../../../types/types";
import { TrackDetails } from "./components/TrackDetails/TrackDetails";
import { ArtistDetails } from "./components/ArtistDetails/ArtistDetails";
import { AlbumDetails } from "./components/AlbumDetails/AlbumDetails";

type SupportedType = "album" | "artist" | "track";

export const Details = () => {
  const { type, id } = useParams<{ type: SupportedType; id: string }>();
  const navigate = useNavigate();

  const {
    data: albumData,
    isLoading: isLoadingAlbum,
    error: errorAlbum,
  } = useGetAlbumQuery(id!, { skip: type !== "album" });
  const {
    data: artistData,
    isLoading: isLoadingArtist,
    error: errorArtist,
  } = useGetArtistQuery(id!, { skip: type !== "artist" });
  const {
    data: trackData,
    isLoading: isLoadingTrack,
    error: errorTrack,
  } = useGetTrackQuery(id!, { skip: type !== "track" });

  if (!type || !id) return <Page>Błąd!</Page>;
  if (!["album", "artist", "track"].includes(type))
    return <Page>Nieobsługiwany typ.</Page>;

  if (isLoadingAlbum || isLoadingArtist || isLoadingTrack)
    return <Page>Ładowanie...</Page>;
  if (errorAlbum || errorArtist || errorTrack)
    return <Page>Błąd ładowania danych.</Page>;
  if (!albumData && !artistData && !trackData) return <Page>Brak danych.</Page>;

  return (
    <Page>
      <BackButton onClick={() => navigate(-1)}>← Wróć</BackButton>
      {type === "album" && <AlbumDetails album={albumData as Album} />}
      {type === "artist" && <ArtistDetails artist={artistData as Artist} />}
      {type === "track" && <TrackDetails track={trackData as Track} />}
    </Page>
  );
};
