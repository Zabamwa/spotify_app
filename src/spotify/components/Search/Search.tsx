import { useSearchParams } from "react-router-dom";
import {
  Page,
  Controls,
  SearchBar,
  TypeSelect,
  CardsGrid,
  Card,
  CardImg,
  CardName,
  DetailsLink,
} from "./Search.styles";
import { useSearchQuery } from "../../../api/spotifyAPI.ts";
import { useState, useEffect } from "react";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton.tsx";
import { useDebounce } from "../../../hooks/useDebounce.ts";
import type {
  Album,
  Artist,
  ContentType,
  Track,
} from "../../../types/types.ts";

const types = ["album", "artist", "track"];
const SPOTIFY_LOGO =
  "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png";

export const getImageUrl = (
  item: Album | Artist | Track | null | undefined,
  type: string,
) => {
  if (!item) return SPOTIFY_LOGO;

  if (type === "track") {
    return SPOTIFY_LOGO;
  }

  const images = (item as Album | Artist).images;
  if (images?.[0]?.url) {
    return images[0].url;
  }

  return SPOTIFY_LOGO;
};

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const type: ContentType =
    (searchParams.get("type") as ContentType) || "album";

  const debouncedQ = useDebounce(search, 500);

  useEffect(() => {
    setSearchParams({ q: debouncedQ, type });
  }, [debouncedQ, type, setSearchParams]);

  const { data, isLoading, error } = useSearchQuery(
    { q: searchParams.get("q") || "", type },
    { skip: !searchParams.get("q") },
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ q: debouncedQ, type: e.target.value });
  };

  useEffect(() => {
    if (search) {
      sessionStorage.setItem(
        "lastSearchUrl",
        `/?q=${encodeURIComponent(search)}&type=${type}`,
      );
    }
  }, [search, type]);

  let items: Album[] | Artist[] | Track[] = [];
  if (data) {
    if (type === "album") items = data.albums?.items ?? [];
    else if (type === "artist") items = data.artists?.items ?? [];
    else if (type === "track") items = data.tracks?.items ?? [];
  }

  return (
    <Page>
      <Controls>
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Wyszukaj..."
        />
        <TypeSelect value={type} onChange={handleTypeChange}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </TypeSelect>
      </Controls>
      {isLoading && <p>Ładowanie...</p>}
      {error && (searchParams.get("q") || search) && <p>Błąd!</p>}
      {data && (
        <CardsGrid>
          {items.map((item) => (
            <Card key={item?.id}>
              <CardImg
                src={getImageUrl(item, type)}
                alt={item?.name ?? "no-image"}
              />
              <CardName>{item?.name ?? ""}</CardName>
              <DetailsLink
                to={`/${type}/${item?.id}`}
                state={{
                  from: `/search?q=${encodeURIComponent(debouncedQ)}&type=${type}`,
                }}
              >
                Szczegóły
              </DetailsLink>
              <FavoriteButton
                id={item.id}
                type={type}
                name={item.name}
                imageUrl={getImageUrl(item, type)}
              />
            </Card>
          ))}
        </CardsGrid>
      )}
    </Page>
  );
};
