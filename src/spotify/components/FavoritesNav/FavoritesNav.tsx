import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { FavCount, FavNav } from "./FavoritesNav.styles.ts";
import type { RootState } from "../../../store/store.ts";

export const FavoritesNav = () => {
  const count = useSelector((state: RootState) => state.favorites.items.length);

  return (
    <FavNav to="/favorites">
      <Heart fill="#1ed760" size={20} data-testid="lucide-icon" />
      Ulubione
      <FavCount>{count}</FavCount>
    </FavNav>
  );
};
