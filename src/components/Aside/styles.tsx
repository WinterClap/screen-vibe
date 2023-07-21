import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const AsideText = styled.h1<{ $collapsed?: boolean }>`
  color: ${(props) => props.theme.text};
  font-size: 1.4rem;
  margin: 0px 0px 10px 0px;
  width: 100%;

  ${(props) => props.$collapsed && "font-size: 0.7rem; text-align:center"};

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

export const AsideContent = styled(motion.div)<{ $visible?: boolean }>`
  width: ${(props) => (props.$visible ? "225px" : "100%")};
  height: 100%;
  gap: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    display: ${(props) => (props.$visible ? "flex" : "none")};
  }
`;

export const ItemsContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
`;

export const AsideItemContainer = styled(motion.div)<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  margin: 0px 20px 0px 10px;

  ${(props) => props.$collapsed && "margin: 0; justify-content: center"}
`;

export const AsideItemContainerWrapper = styled.button<{ $isActiveOrFocused?: boolean }>`
  all: unset;
  width: 100%;
  cursor: pointer;
  padding: 5px 0px;
  color: ${(props) => (props.$isActiveOrFocused ? props.theme.primary : props.theme.dimmedText)};
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0px;
  transition: color 0.5s ease;
  outline: none;
  position: relative;

  &:disabled {
    cursor: default;

    ::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0,0,0, 0.1)")};
      border-radius: 10px;
    }
  }
`;

export const ItemWrapper = styled(motion.div)`
  background-color: ${(props) => props.theme.primary + "2a"};
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.primary + "4f"};
`;

export const AsideItemBox = styled.li<{ $isActive?: boolean; $collapsed?: boolean; $disabled?: boolean }>`
  display: flex;
  z-index: 1;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 5px;
  margin-left: -10px;
  border-radius: 10px;
  transition: background-color 0.15s ease-in;

  ${(props) =>
    !props.$disabled &&
    css<{ $isActive?: boolean; $collapsed?: boolean; $disabled?: boolean }>`
      &:hover {
        background-color: ${(props) => (!props.$isActive ? props.theme.disabledButtonBg : "inherit")};

        a {
          color: ${(props) =>
            props.$isActive
              ? props.theme.primary
              : props.theme.MODE === "dark"
              ? props.theme.softDimmedText
              : props.theme.dark};
        }
      }
    `}

  ${(props) => props.$collapsed && "margin-left: 0; margin-bottom: 10px"}
`;

export const AsideMenuContainer = styled(motion.div)<{ $isDynamic?: boolean }>`
  display: none;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: ${(props) => (props.$isDynamic ? 0 : 10)}px;
  margin-left: ${(props) => (props.$isDynamic ? "auto" : "unset")};

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
  }
`;

export const AsideMenuContainerRect = styled(motion.div)`
  cursor: pointer;
  border-radius: 5px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const AsideOpaqueBackground = styled(motion.div)`
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(15, 15, 15, 0.6)" : "rgba(15,15,15,0.2)")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 30;
`;

export const AsideDrawerContainer = styled(motion.div)<{ $inverse?: boolean }>`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  display: flex;
  overflow-x: hidden;
  flex-direction: ${(props) => (props.$inverse ? "row-reverse" : "row")};
`;
