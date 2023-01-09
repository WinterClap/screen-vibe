import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const NavContainer = styled.nav`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    justify-content: center;
  }
`;

export const LinksContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: none;
  }
`;

export const LinkContainer = styled.li<{ $isActive?: boolean }>`
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: bold;
  transition: color 0.05s ease-in-out;
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.dimmedText)};
  /* display: inline-block; */
  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;

export const NavListContainer = styled.div`
  display: none;
  width: 80%;
  height: 33px;
  position: relative;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: block;
  }
`;

export const NavListSelect = styled.div`
  border: 2px solid ${(props) => props.theme.softDimmedText};
  height: 100%;
  outline: none;
  border-radius: 15px;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border 0.15s ease-in;

  &[aria-expanded="true"] {
    border: 2px solid ${(props) => props.theme.focusButtonPrimary};
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.focusButtonPrimary};
  }
`;

export const NavListText = styled.h6`
  font-size: 1.15rem;
  font-weight: bold;
  transition: color 0.05s ease-in-out;
  color: ${(props) => props.theme.primary};
  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
  margin: 0;
  font-size: 1rem;
  padding-left: 0.8rem;
`;

export const NavListDropdown = styled(motion.ul)`
  border: 2px solid ${(props) => props.theme.blurredInput};
  border-radius: 15px;
  position: absolute;
  list-style: none;
  width: 100%;
  padding: 5px;
  margin: 5px 0px 0px 0px;
  background-color: ${(props) => props.theme.defaultBackground};
  box-shadow: ${(props) =>
    props.theme.MODE === "dark"
      ? "0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.62), 0 9px 28px 8px rgba(0, 0, 0, 0.45)"
      : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"};
`;

export const OptionContainer = styled.li<{ $isActive: boolean; $isFocused: boolean }>`
  display: block;
  transition: background-color 0.2s ease-out;
  border-radius: 5px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$isActive ? props.theme.focusPrimarySoft : props.$isFocused ? props.theme.dimmedInputFocus : ""};
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.text)};

  &:hover {
    background-color: ${(props) => props.theme.dimmedInputFocus};
  }

  &:not(:last-of-type) {
    margin-bottom: 3px;
  }
`;
