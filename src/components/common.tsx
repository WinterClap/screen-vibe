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
  flexWrap?: "wrap" | "nowrap";
  w?: string;
  mw?: string;
  h?: string;
  $mobileL?: string;
  $mobileM?: string;
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
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
  cursor: ${(props) => props.cursor || "auto"};
  max-width: ${(props) => props.mw || "none"};
`;
export const Col = styled.div<FlexComponentInterface>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
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
}

export const IconContainer = styled(motion.div)<IconContainerProps & { color: string }>`
  display: ${(props) => props.display || "flex"};
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
  cursor: ${(props) => props.cursor || "auto"};
  font-size: ${(props) => props.size || "inherit"}px;
  color: ${(props) => props.color || props.theme.dark};
  ${(props) => props.transform && `transform: ${props.transform}`}

  @media(max-width: ${DEVICE_SIZES.mobileM}) {
    ${(props) => props.$mobileM && props.$mobileM}
  }
`;

export const StyledLink = styled(Link)<{
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
  outline: none;
`;
