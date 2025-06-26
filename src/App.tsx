import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Search } from "./spotify/components/Search/Search.tsx";
import { Details } from "./spotify/components/Details/Details.tsx";
import { LoginButton } from "./spotify/components/LoginButton/LoginButton.tsx";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store.ts";
import { Page } from "./App.styles.ts";
import { useEffect } from "react";
import { setToken } from "./store/slices/authSlice.ts";
import { FavoritesNav } from "./spotify/components/FavoritesNav/FavoritesNav.tsx";
import { Favorites } from "./spotify/components/Favorites/Favorites.tsx";

export default function App() {
  const dispatch = useDispatch();
  useSpotifyAuth();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) dispatch(setToken(token));
  }, [dispatch]);

  if (!token) {
    return (
      <Page>
        <LoginButton />
      </Page>
    );
  }

  return (
    <Page>
      <BrowserRouter>
        <FavoritesNav />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/:type/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* ...inne podstrony */}
        </Routes>
      </BrowserRouter>
    </Page>
  );
}
