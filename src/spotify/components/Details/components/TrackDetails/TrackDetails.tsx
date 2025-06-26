import {
  DetailsCard,
  DetailsImg,
  DetailsContent,
  DetailsTitle,
  DetailsArtist,
} from "../../Details.styles";
import { FavoriteButton } from "../../../FavoriteButton/FavoriteButton";
import { getImageUrl } from "../../../Search/Search";
import type { Track, Artist } from "../../../../../types/types";

type Props = { track: Track };

export const TrackDetails = ({ track }: Props) => (
  <DetailsCard>
    <DetailsImg
      src={getImageUrl(track, "track")}
      alt={track.name}
      data-testid="details-img"
    />
    <DetailsContent>
      <DetailsTitle data-testid="details-title">{track.name}</DetailsTitle>
      <DetailsArtist data-testid="details-artist">
        {track.artists?.map((a: Artist) => a.name).join(", ")}
      </DetailsArtist>
      <FavoriteButton
        id={track.id}
        type={track.type}
        name={track.name}
        imageUrl={getImageUrl(track, "track")}
      />
    </DetailsContent>
  </DetailsCard>
);
