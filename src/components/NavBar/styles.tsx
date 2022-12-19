import styled from "styled-components";

export const NavContainer = styled.nav`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
`;

export const LinksContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  border: 1px solid black;
`;

export const LinkContainer = styled.li<{ $isActive?: boolean }>`
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: bold;
  transition: color 0.05s ease-in-out;
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.dimmedText)};
  /* display: inline-block; */
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;
