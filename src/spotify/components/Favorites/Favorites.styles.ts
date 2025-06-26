import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #121212;
  color: #fff;
  font-family: "Montserrat", "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0 1.5rem 0;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#1ed760" : "transparent")};
  color: ${({ $active }) => ($active ? "#121212" : "#fff")};
  border: none;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.5em 1.6em;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  &:hover,
  &:focus {
    background: #1db954;
    color: #fff;
    outline: none;
  }
`;

export const Count = styled.span`
  margin-left: 1.6rem;
  background: #232323;
  color: #1ed760;
  border-radius: 999px;
  font-weight: 600;
  padding: 0.28em 1em;
  font-size: 1rem;
`;

export const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.li`
  flex: 1 1 220px;
  max-width: 240px;
  min-width: 200px;
  min-height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #181818;
  border-radius: 1.25rem;
  box-shadow: 0 8px 24px #0005;
  padding: 1.5rem 1rem 1.2rem 1rem;
  margin-bottom: 1rem;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  &:hover {
    box-shadow: 0 16px 48px #000a;
    transform: translateY(-4px) scale(1.03);
  }
`;

export const CardImg = styled.img`
  border-radius: 0.75rem;
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const CardName = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 0.5rem;
  word-break: break-word;
  overflow-wrap: anywhere;
  display: block;
  width: 100%;
`;

import { Link } from "react-router-dom";
export const DetailsLink = styled(Link)`
  color: #1ed760;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #1db954;
  }
`;
