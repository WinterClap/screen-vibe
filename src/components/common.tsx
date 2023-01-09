import styled from "styled-components";
import { motion } from "framer-motion";
import { DEVICE_SIZES } from "../constants";
import Link from "next/link";

/** Layout Components */
type FlexComponentInterface = {
  m?: string;
  $justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  $alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  p?: string;
  $gap?: string;
  $flexWrap?: "wrap" | "nowrap";
  w?: string;
  mw?: string;
  h?: string;
  $mobileL?: string;
  $mobileM?: string;
  $tablet?: string;
  pos?: "absolute" | "relative";
  cursor?:
    | "auto"
    | "default"
    | "none"
    | "context-menu"
    | "help"
    | "pointer"
    | "wait"
    | "progress"
    | "cell"
    | "crosshair"
    | "text"
    | "vertical-text"
    | "alias"
    | "copy"
    | "move"
    | "no-drop"
    | "not-allowed"
    | "grab"
    | "grabbing"
    | "all-scroll"
    | "col-resize"
    | "row-resize"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ne-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "ew-resize"
    | "ns-resize"
    | "nesw-resize"
    | "nwse-resize"
    | "zoom-in"
    | "zoom-out";
};

export const Row = styled.div<FlexComponentInterface>`
  display: flex;
  gap: ${(props) => props.$gap || 0};
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.$flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
  cursor: ${(props) => props.cursor || "auto"};
  max-width: ${(props) => props.mw || "none"};

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    ${(props) => props.$tablet}
  }
`;
export const Col = styled.div<FlexComponentInterface>`
  gap: ${(props) => props.$gap || 0};
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.$flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
  cursor: ${(props) => props.cursor || "auto"};
  max-width: ${(props) => props.mw || "none"};

  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    ${(props) => props.$mobileL && props.$mobileL};
  }
`;

interface IconContainerProps extends FlexComponentInterface {
  display?: "none" | "flex" | "block" | "inline" | "inline-block" | "grid";
  size?: number;
  transform?: string;
  $inset?: string;
  $pointerEvents?: string;
}

export const IconContainer = styled(motion.div)<IconContainerProps & { color: string }>`
  gap: ${(props) => props.$gap || 0};
  display: ${(props) => props.display || "flex"};
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.$flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
  cursor: ${(props) => props.cursor || "auto"};
  font-size: ${(props) => props.size || "inherit"};
  color: ${(props) => props.color || props.theme.dark};
  inset: ${(props) => props.$inset || "auto"};
  pointer-events: ${(props) => props.$pointerEvents};
  ${(props) => props.transform && `transform: ${props.transform}`}

  @media(max-width: ${DEVICE_SIZES.mobileM}) {
    ${(props) => props.$mobileM && props.$mobileM}
  }
`;

export const StyledLink = styled(Link)<{
  $withOutline?: boolean;
  $color?: string;
  $hoverColor?: string;
  $fontWeight?: string | number;
  $fontSize?: string;
  $m?: string;
  $p?: string;
  $w?: string;
  $d?: string;
}>`
  width: ${(props) => props.$w || "auto"};
  padding: ${(props) => props.$p || "0px"};
  color: ${(props) => props.$color || "inherit"};
  font-weight: ${(props) => props.$fontWeight || "inherit"};
  font-size: ${(props) => props.$fontSize || "inherit"};
  margin: ${(props) => props.$m || "0px"};
  display: ${(props) => props.$d || "auto"};
  transition: color 0.5s ease;
  outline: ${(props) => (props.$withOutline ? "invert none medium" : "none")};
`;

/** Buttons */
export const Button = styled.button<
  FlexComponentInterface & { $secondary?: boolean; $fontSize?: string; $extended?: boolean; $display?: string }
>`
  display: ${(props) => props.$display || "inline-block"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  width: ${(props) => props.w || "auto"};
  outline: none;
  cursor: pointer;
  appearance: none;
  border: 2px solid ${(props) => (props.$secondary ? props.theme.dimmedInputFocus : "transparent")};
  border-radius: 10px;
  padding: ${(props) => (props.$extended ? "0.6rem 2rem" : "0.7rem")};
  font-weight: 600;
  transition: all 0.15s ease-in;
  font-size: ${(props) => props.$fontSize || "0.9rem"};
  color: ${(props) => (props.$secondary ? props.theme.text : (props) => props.theme.white)};
  background-color: ${(props) => (props.$secondary ? "transparent" : props.theme.secondary)};

  &:hover {
    background-color: ${(props) =>
      props.$secondary ? props.theme.secondaryButtonHover : props.theme.primaryButtonHover};
  }

  &:disabled {
    color: ${(props) => (props.$secondary ? props.theme.dimmedText : props.theme.primary + "aa")};
    cursor: not-allowed;
    background-color: ${(props) => (props.$secondary ? props.theme.disabledButtonBg : props.theme.secondary + "2a")};
    &:hover {
      background-color: ${(props) => (props.$secondary ? props.theme.disabledButtonBg : props.theme.secondary + "2a")};
    }
  }

  &:focus {
    border: 2px solid
      ${(props) => (props.$secondary ? props.theme.focusButtonSecondary : props.theme.focusButtonPrimary)};
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    ${(props) => props.$tablet && props.$tablet}
  }
`;
