import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/authSlice.ts";

const CLIENT_ID = "74ed2e03d00d4973a39fdd65ec072c85";
const REDIRECT_URI = "http://127.0.0.1:5173";

export const useSpotifyAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code && !sessionStorage.getItem("spotify_code_used")) {
      sessionStorage.setItem("spotify_code_used", "1");

      fetchToken(code).then((data) => {
        dispatch(setToken(data.access_token));
        window.history.replaceState({}, "", REDIRECT_URI);
      });
    }
  }, [dispatch]);
};

const fetchToken = async (code: string) => {
  const verifier = sessionStorage.getItem("spotify_pkce_verifier")!;
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return res.json();
};
