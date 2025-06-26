import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../../../auth/pkce";
import { SpotifyButton } from "../FavoriteButton/FavoriteButtons.styles.ts";

const CLIENT_ID = "74ed2e03d00d4973a39fdd65ec072c85";
const REDIRECT_URI = "http://127.0.0.1:5173";
const SCOPE = "user-library-read user-library-modify";

export const LoginButton = () => {
  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    sessionStorage.setItem("spotify_pkce_verifier", verifier);
    sessionStorage.removeItem("spotify_code_used");
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: challenge,
      scope: SCOPE,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <SpotifyButton onClick={handleLogin}>Zaloguj przez Spotify</SpotifyButton>
  );
};
