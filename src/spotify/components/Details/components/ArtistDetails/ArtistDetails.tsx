import {
  DetailsCard,
  DetailsImg,
  DetailsContent,
  DetailsTitle,
  DetailsMeta,
} from "../../Details.styles";
import { FavoriteButton } from "../../../FavoriteButton/FavoriteButton";
import { getImageUrl } from "../../../Search/Search";
import type { Artist } from "../../../../../types/types";

type Props = { artist: Artist };

export const ArtistDetails = ({ artist }: Props) => (
  <DetailsCard>
    <DetailsImg
      src={getImageUrl(artist, "artist")}
      alt={artist.name}
      data-testid="details-img"
    />
    <DetailsContent>
      <DetailsTitle data-testid="details-title">{artist.name}</DetailsTitle>
      <DetailsMeta data-testid="details-meta">
        Popularność: {artist.popularity}
        <br />
        Gatunki: {(artist.genres ?? []).join(", ")}
      </DetailsMeta>
      <FavoriteButton
        id={artist.id}
        type={artist.type}
        name={artist.name}
        imageUrl={getImageUrl(artist, "artist")}
      />
    </DetailsContent>
  </DetailsCard>
);
