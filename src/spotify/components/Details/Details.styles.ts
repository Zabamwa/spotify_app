import styled from "styled-components";

export const DetailsCard = styled.div`
  background: #181818;
  border-radius: 2rem;
  min-width: 480px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 8px 32px #000b;
  padding: 2.5rem 3rem 2.5rem 2.5rem;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`;

export const DetailsImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 1.5rem;
  object-fit: cover;
  box-shadow: 0 8px 24px #0006;
`;

export const DetailsContent = styled.div`
  flex: 1;
`;

export const DetailsTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1.1rem;
  color: #fff;
`;

export const DetailsArtist = styled.p`
  color: #1ed760;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const DetailsMeta = styled.p`
  color: #eee;
  font-size: 1.08rem;
  margin-bottom: 1.1rem;
`;

export const TrackList = styled.ol`
  max-height: 330px;
  overflow-y: auto;
  background: #191919;
  border-radius: 1rem;
  padding: 1.2rem 1.2rem 1.2rem 2.2rem;
  margin: 1.3rem 0 0 0;
  color: #eee;
  font-size: 1.04rem;
  list-style: decimal;
  box-shadow: 0 2px 8px #0004;
  /* Ładny cienki pasek scrolla: */
  scrollbar-width: thin;
  scrollbar-color: #1ed760 #232323;
  & > li {
    margin-bottom: 0.44rem;
    transition: color 0.12s;
    cursor: pointer;
    opacity: 0.97;
    &:hover {
      color: #1ed760;
      opacity: 1;
    }
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #1ed760;
  font-size: 1.04rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.4rem;
  padding: 0.3em 0.8em;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  transition:
    background 0.15s,
    color 0.15s;
  &:hover,
  &:focus {
    background: #1ed76022;
    color: #fff;
    outline: none;
  }
`;
