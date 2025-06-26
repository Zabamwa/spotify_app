import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album, Artist, Track, SearchResponse } from "../types/types.ts";
import type { RootState } from "../store/store.ts";
import { logout } from "../store/slices/authSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.spotify.com/v1",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token ||
      localStorage.getItem("spotify_access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWith401: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.removeItem("spotify_access_token");
    sessionStorage.removeItem("spotify_pkce_verifier");
    sessionStorage.removeItem("spotify_code_used");
    api.dispatch(logout());
  }

  return result;
};

export const spotifyAPI = createApi({
  reducerPath: "spotifyAPI",
  baseQuery: baseQueryWith401,
  endpoints: (builder) => ({
    getAlbum: builder.query<Album, string>({
      query: (id) => `/albums/${id}`,
    }),
    getArtist: builder.query<Artist, string>({
      query: (id) => `/artists/${id}`,
    }),
    getTrack: builder.query<Track, string>({
      query: (id) => `/tracks/${id}`,
    }),

    search: builder.query<
      SearchResponse,
      { q: string; type: "album" | "artist" | "track" }
    >({
      query: ({ q, type }) =>
        `/search?q=${encodeURIComponent(q)}&type=${type}&limit=24`,
    }),
  }),
});

export const {
  useGetAlbumQuery,
  useGetArtistQuery,
  useGetTrackQuery,
  useSearchQuery,
} = spotifyAPI;
