import { useDispatch, useSelector } from "react-redux";
import { SpotifyButton } from "./FavoriteButtons.styles.ts";
import {
  addFavorite,
  removeFavorite,
} from "../../../store/slices/favoriteSlice.ts";
import { Star, StarOff } from "lucide-react";
import type { RootState } from "../../../store/store.ts";
import type { ContentType } from "../../../types/types.ts";
import React from "react";

type tPropsFavoriteButtons = {
  id: string;
  type: ContentType;
  name: string;
  imageUrl: string;
};

export const FavoriteButton = (props: tPropsFavoriteButtons) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some(
      (item) => item.id === props.id && item.type === props.type,
    ),
  );

  const handleCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: props.id, type: props.type }));
    } else {
      dispatch(addFavorite(props));
    }
    e.currentTarget.blur();
  };

  return (
    <SpotifyButton
      $active={isFavorite}
      onClick={handleCLick}
      title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
    >
      {isFavorite ? <Star fill="#121212" size={20} /> : <StarOff size={20} />}
      {isFavorite ? "Ulubione" : "Dodaj do ulubionych"}
    </SpotifyButton>
  );
};
