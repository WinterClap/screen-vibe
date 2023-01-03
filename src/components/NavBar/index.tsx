import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useTheme } from "styled-components";
import { navLinks } from "../../navbars/main/constants";
import { IconContainer, StyledLink } from "../common";
import {
  LinkContainer,
  LinksContainer,
  NavContainer,
  NavListContainer,
  NavListDropdown,
  NavListSelect,
  NavListText,
  OptionContainer,
} from "./styles";

const NavBar = () => {
  const theme = useTheme();
  const dropdownContainerRef = React.useRef<HTMLUListElement>(null);
  const { pathname, push } = useRouter();
  const [shouldShowDropdown, setShouldShowDropdown] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<typeof navLinks[number]>(
    navLinks.find((link) => pathname.match(link.href)) || navLinks[0]
  );
  const [focusedOption, setFocusedOption] = React.useState<typeof navLinks[number] & { idx: number }>({
    ...navLinks[0],
    idx: 0,
  });

  const onSelectClick = () => {
    setShouldShowDropdown((prev) => !prev);
  };

  const onOptionClick = (option: typeof navLinks[number]) => {
    setShouldShowDropdown(false);
    setSelectedOption(option);
  };

  const onSelectBlur = () => {
    setShouldShowDropdown(false);
  };

  const onSelectKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (![" ", "ArrowDown", "ArrowUp", "Escape", "Enter"].includes(e.key)) return;
    if (e.key === " ") {
      onSelectClick();
      return;
    }
    if (e.key === "ArrowDown") {
      if (navLinks[focusedOption.idx + 1]) {
        setFocusedOption((prev) => ({ ...navLinks[prev.idx + 1], idx: prev.idx + 1 }));
        return;
      }
      setFocusedOption({ ...navLinks[0], idx: 0 });
      return;
    }
    if (e.key === "ArrowUp") {
      if (navLinks[focusedOption.idx - 1]) {
        setFocusedOption((prev) => ({ ...navLinks[prev.idx - 1], idx: prev.idx - 1 }));
        return;
      }
      setFocusedOption({ ...navLinks[navLinks.length - 1], idx: navLinks.length - 1 });
      return;
    }
    if (e.key === "Enter") {
      push(focusedOption.href);
      setShouldShowDropdown(false);
      return;
    }
    if (e.key === "Escape") {
      setShouldShowDropdown(false);
    }
  };

  return (
    <NavContainer>
      <LinksContainer>
        {navLinks.map((link, idx) => (
          <LinkContainer $isActive={!!pathname.match(link.href)} key={idx}>
            <StyledLink $withOutline $d="block" $p="5px 10px 5px 5px" href={link.href}>
              {link.name}
            </StyledLink>
          </LinkContainer>
        ))}
      </LinksContainer>
      <NavListContainer>
        <NavListSelect
          tabIndex={0}
          aria-haspopup="listbox"
          role="combobox"
          onBlur={onSelectBlur}
          onKeyDown={onSelectKeyDown}
          onClick={onSelectClick}
          aria-expanded={shouldShowDropdown}
        >
          <NavListText>{selectedOption.name}</NavListText>
          <IconContainer
            initial={false}
            animate={{ rotate: shouldShowDropdown ? 180 : 0, transition: { duration: 0.3 } }}
            $pointerEvents="none"
            color={shouldShowDropdown ? theme.primary : theme.dimmedText}
            pos="absolute"
            $inset="auto 10px auto auto"
            cursor="pointer"
          >
            <IoChevronDownCircleOutline size={22} />
          </IconContainer>
        </NavListSelect>
        <AnimatePresence>
          {shouldShowDropdown && (
            <NavListDropdown ref={dropdownContainerRef} tabIndex={-1} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {navLinks.map((link, idx) => (
                <OptionContainer
                  $isFocused={focusedOption?.idx === idx}
                  $isActive={!!pathname.match(link.href)}
                  aria-selected={!!pathname.match(link.href)}
                  onClick={() => onOptionClick(link)}
                  key={idx}
                >
                  <StyledLink $d="block" $p="0.4rem 0.8rem" href={link.href}>
                    {link.name}
                  </StyledLink>
                </OptionContainer>
              ))}
            </NavListDropdown>
          )}
        </AnimatePresence>
      </NavListContainer>
    </NavContainer>
  );
};

export default NavBar;
