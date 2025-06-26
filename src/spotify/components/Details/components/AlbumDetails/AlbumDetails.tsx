import {
  DetailsCard,
  DetailsImg,
  DetailsContent,
  DetailsTitle,
  DetailsArtist,
  DetailsMeta,
  TrackList,
} from "../../Details.styles";
import { FavoriteButton } from "../../../FavoriteButton/FavoriteButton";
import { getImageUrl } from "../../../Search/Search";
import type { Album, Artist, Track } from "../../../../../types/types";

type Props = { album: Album };

export const AlbumDetails = ({ album }: Props) => (
  <DetailsCard>
    <DetailsImg
      src={getImageUrl(album, "album")}
      alt={album.name}
      data-testid="details-img"
    />
    <DetailsContent>
      <DetailsTitle data-testid="details-title">{album.name}</DetailsTitle>
      <DetailsArtist data-testid="details-artist">
        {album.artists?.map((a: Artist) => a.name).join(", ")}
      </DetailsArtist>
      <DetailsMeta data-testid="details-meta">
        Data wydania: {album.release_date}
      </DetailsMeta>
      <FavoriteButton
        id={album.id}
        type={album.type}
        name={album.name}
        imageUrl={getImageUrl(album, "album")}
      />
      <h3 style={{ margin: "1.5rem 0 0.5rem" }}>Utwory:</h3>
      <TrackList data-testid="track-list">
        {album.tracks?.items?.map((track: Track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </TrackList>
    </DetailsContent>
  </DetailsCard>
);
