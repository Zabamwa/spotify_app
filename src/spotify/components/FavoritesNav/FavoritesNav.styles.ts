import styled from "styled-components";
import { Link } from "react-router-dom";

export const FavNav = styled(Link)`
  position: absolute;
  right: 32px;
  top: 24px;
  color: #1ed760;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3em;
  font-size: 19px;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

export const FavCount = styled.span`
  background: #1ed760;
  color: #121212;
  border-radius: 1em;
  padding: 0.12em 0.65em;
  font-size: 15px;
  margin-left: 0.35em;
`;
