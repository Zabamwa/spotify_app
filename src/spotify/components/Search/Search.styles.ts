import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  font-family: "Montserrat", "Arial", sans-serif;
`;

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem 0 1rem;
`;

export const SearchBar = styled.input`
  background: #181818;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 0 0 2px #181818;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #1ed760;
  }
`;

export const TypeSelect = styled.select`
  background: #181818;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  outline: none;
`;

export const CardsGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
  padding: 2rem;
  list-style: none;
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
