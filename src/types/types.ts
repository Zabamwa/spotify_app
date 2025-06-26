export interface Artist {
  id: string;
  name: string;
  images?: { url: string }[];
  type: "artist";
  popularity?: number;
  genres?: string[];
  external_url?: string;
}

export interface Album {
  id: string;
  name: string;
  images?: { url: string }[];
  artists: Artist[];
  release_date: string;
  type: "album";
  tracks?: { items: Track[] };
}

export interface Track {
  id: string;
  name: string;
  type: "track";
  artists: Artist[];
}

export type Favorite = {
  id: string;
  type: ContentType;
  name: string;
  imageUrl: string;
};

export type ContentType = "album" | "artist" | "track";

export interface SearchResponse {
  albums?: { items: Album[] };
  artists?: { items: Artist[] };
  tracks?: { items: Track[] };
}
