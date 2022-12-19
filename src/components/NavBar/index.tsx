import { useRouter } from "next/router";
import React from "react";
import { navLinks } from "../../navbars/main/constants";
import { StyledLink } from "../common";
import { LinkContainer, LinksContainer, NavContainer } from "./styles";

const NavBar = () => {
  const { pathname } = useRouter();

  return (
    <NavContainer>
      <LinksContainer>
        {navLinks.map((link, idx) => (
          <LinkContainer $isActive={!!pathname.match(link.href)} key={idx}>
            <StyledLink $d="block" $p="5px 10px 5px 5px" href={link.href}>
              {link.name}
            </StyledLink>
          </LinkContainer>
        ))}
      </LinksContainer>
    </NavContainer>
  );
};

export default NavBar;
