import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: var(--color-brand-900);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: var(--color-brand-800);
  }

  &:focus {
    outline: none;
    text-decoration: underline;
    color: var(--color-brand-700);
  }

  &:active {
    color: var(--color-brand-600);
  }
`;

export default StyledLink