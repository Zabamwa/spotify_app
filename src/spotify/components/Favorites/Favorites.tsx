import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Page,
  Tabs,
  TabButton,
  Count,
  CardsGrid,
  Card,
  CardImg,
  CardName,
  DetailsLink,
} from "./Favorites.styles";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton.tsx";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../Details/Details.styles.ts";
import type { RootState } from "../../../store/store.ts";
import type { Favorite } from "../../../types/types.ts";
import { selectFavoritesByType } from "../../../store/selectors/favoriteSelector.ts";

const TABS = [
  { key: "album", label: "Albumy" },
  { key: "artist", label: "Artyści" },
  { key: "track", label: "Utwory" },
];

export const Favorites = () => {
  const [tab, setTab] = useState("album");
  const navigate = useNavigate();
  const items = useSelector((state: RootState) =>
    selectFavoritesByType(state, tab),
  );
  const total = useSelector((state: RootState) => state.favorites.items.length);

  const handleGoHome = () => {
    const lastSearchUrl = sessionStorage.getItem("lastSearchUrl");
    if (lastSearchUrl) {
      navigate(lastSearchUrl);
    } else {
      navigate("/");
    }
  };

  return (
    <Page>
      <BackButton onClick={handleGoHome}>&#8592; Strona główna</BackButton>
      <h2 style={{ fontSize: 26, fontWeight: 700, margin: "2rem 0 0.5rem" }}>
        Ulubione
      </h2>
      <Tabs>
        {TABS.map((t) => (
          <TabButton
            key={t.key}
            $active={tab === t.key}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </TabButton>
        ))}
        <Count>{total} wszystkich</Count>
      </Tabs>
      <CardsGrid>
        {items.length === 0 && (
          <div
            style={{
              color: "#aaa",
              margin: "2rem 0",
              fontSize: 19,
              gridColumn: "1 / -1",
            }}
          >
            Brak ulubionych w tej kategorii.
          </div>
        )}
        {items.map((item: Favorite) => (
          <Card key={item.id}>
            <CardImg src={item.imageUrl} alt={item.name} />
            <CardName>{item.name}</CardName>
            <DetailsLink to={`/${item.type}/${item.id}`}>Szczegóły</DetailsLink>
            <FavoriteButton
              id={item.id}
              type={item.type}
              name={item.name}
              imageUrl={item.imageUrl}
            />
          </Card>
        ))}
      </CardsGrid>
    </Page>
  );
};
