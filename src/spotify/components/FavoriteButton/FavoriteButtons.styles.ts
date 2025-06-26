import styled from "styled-components";

export const SpotifyButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.5em 1.4em;
  font-weight: 600;
  font-size: 1.05rem;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#1ed760" : "#232323")};
  color: ${({ $active }) => ($active ? "#121212" : "#fff")};
  box-shadow: 0 2px 8px #0004;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    transform 0.1s;
  margin-top: 1rem;
  &:hover,
  &:focus {
    background: #1db954;
    color: #fff;
    transform: translateY(-2px) scale(1.03);
    outline: none;
  }
`;
