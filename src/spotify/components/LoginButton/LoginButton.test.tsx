import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginButton } from "./LoginButton";

vi.mock("../../../auth/pkce", () => ({
  generateCodeVerifier: vi.fn(() => "mock_verifier"),
  generateCodeChallenge: vi.fn(() => Promise.resolve("mock_challenge")),
}));

beforeEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  // @ts-ignore
  delete window.location;
  // @ts-ignore
  window.location = { href: "" };
});

describe("LoginButton", () => {
  it("renders Spotify login button", () => {
    render(<LoginButton />);
    expect(
      screen.getByRole("button", { name: /zaloguj przez spotify/i }),
    ).toBeInTheDocument();
  });

  it("on click generates verifier, challenge, saves to sessionStorage and sets window.location.href", async () => {
    const { generateCodeVerifier, generateCodeChallenge } = await import(
      "../../../auth/pkce"
    );

    render(<LoginButton />);
    fireEvent.click(screen.getByRole("button"));

    expect(generateCodeVerifier).toHaveBeenCalled();

    await Promise.resolve();

    expect(generateCodeChallenge).toHaveBeenCalledWith("mock_verifier");
    expect(sessionStorage.getItem("spotify_pkce_verifier")).toBe(
      "mock_verifier",
    );

    const params = new URLSearchParams({
      client_id: "74ed2e03d00d4973a39fdd65ec072c85",
      response_type: "code",
      redirect_uri: "http://127.0.0.1:5173",
      code_challenge_method: "S256",
      code_challenge: "mock_challenge",
      scope: "user-library-read user-library-modify",
    });

    expect(window.location.href).toBe(
      `https://accounts.spotify.com/authorize?${params.toString()}`,
    );
  });
});
