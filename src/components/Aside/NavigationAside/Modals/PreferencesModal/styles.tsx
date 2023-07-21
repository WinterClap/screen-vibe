import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../../../../constants";

export const PreferencesModalGrid = styled.div`
  display: grid;
  overflow: hidden;
  flex-grow: 1;
  grid-template-columns: 200px 1fr;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const PreferencesModalContainer = styled.div`
  width: 70vw;
  height: 75vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: 100%;
  }
`;

export const PreferencesOptionsContainer = styled(motion.ul)`
  appearance: none;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const PreferencesOptionBox = styled.li<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
  position: relative;
  width: 100%;
  outline: none;
  font-size: 0.85rem;
  cursor: pointer;
  transition: border 0.15s ease-in, background-color 0.15s ease-in, color 0.15s ease-in, font-weight 0.15s ease-in;
  padding: 5px 10px;
  border-radius: 8px;
  margin: 0;
  font-weight: ${(props) => (props.$isActive ? 600 : 500)};
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.dimmedText)};
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.MODE === "dark"
        ? props.theme.dimmedInputFocus
        : props.theme.focusPrimarySoft
      : "transparent"};

  &:hover {
    background-color: ${(props) => !props.$isActive && props.theme.dimmedInputFocus};
    & > svg {
      opacity: 1;
    }
  }

  &:focus {
    background-color: ${(props) => !props.$isActive && props.theme.dimmedInputFocus};
    border: 2px solid ${(props) => (props.$isActive ? props.theme.focusButtonPrimary : props.theme.dimmedInputFocus)};
  }

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }

  & > svg {
    opacity: ${(props) => (props.$isActive ? "1" : "0")};
    transition: opacity 0.15s ease-in;
  }
`;

export const ModalSideBarMainContainerDynamic = styled(motion.div)`
  display: none;
  width: 100%;
  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: block;
  }
`;

export const PageContextContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white + "1a"};
  backdrop-filter: blur(5px);
`;

export const PageContextText = styled.h6`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.dimmedText};
`;

export const PreferencesItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PreferencesTitle = styled.h6`
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;
export const PreferencesDescription = styled.p`
  margin: 0px;
  font-size: 0.7rem;
  font-weight: 400;
  color: ${(props) => props.theme.dimmedText};
`;

export const ContentContainer = styled.div`
  margin-top: 10px;
`;

// Appereance Preferences

// Locale Preferences
