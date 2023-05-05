import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { DEVICE_SIZES } from "../../../constants";

export const SearchBarWrapper = styled(motion.div)<{ $isMobile?: boolean }>`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin: ${(props) => (props.$isMobile ? "0 auto" : "0 0.5rem 0 auto")};
  position: relative;
  max-width: 400px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: ${(props) => (!props.$isMobile ? "none" : "block")};
  }
`;

export const SearchBarContainer = styled(motion.div)<{ $isActive?: boolean }>`
  border-radius: 15px;
  border: 2px solid ${(props) => (props.$isActive ? props.theme.primaryHover : props.theme.softDimmedText)};
  height: 100%;
  padding: 0.25rem 0.5rem;
  width: 100%;
  transition: border 0.15s ease-in-out;
`;

export const SearchBarInput = styled.input`
  all: unset;
  outline: transparent;
  font-size: 0.9rem;
  height: 100%;
  width: 100%;
  min-width: fit-content;

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

export const ResultContainer = styled(motion.div)`
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  z-index: 3;
  margin-top: 0.25rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.defaultBackground};
  box-shadow: ${(props) =>
    props.theme.MODE === "dark"
      ? "0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.62), 0 9px 28px 8px rgba(0, 0, 0, 0.45)"
      : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"};
`;

export const ResultBoxText = styled.p`
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  font-weight: 600;
  user-select: none;
  pointer-events: none;
`;
export const ResultBoxDimmedText = styled.p`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.dimmedText};
  font-size: 0.7rem;
  user-select: none;
  pointer-events: none;
`;

/** ResultBox */

export const ResultBoxContainer = styled.div`
  /* > div {
    :not(:last-of-type) {
      margin-bottom: 0.8rem;
    }
  } */
`;

export const ResultBoxItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 0.8rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.dimmedInputFocus};

    .poster-container[data-person="false"] {
      height: 120px;
    }
  }

  &:first-of-type {
    padding-top: 1rem;
  }

  &:last-of-type {
    padding-bottom: 1rem;
  }
`;

export const ResultBoxItemText = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ResultBoxItemPosterContainer = styled.div`
  position: relative;
  width: 60px;
  height: 90px;
  overflow: hidden;
  border-radius: 0.5rem;
  flex-shrink: 0;
  transition: all 0.15s ease-in-out;

  &[data-person="true"] {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export const CommonOptionsContainer = styled.div`
  height: 40px;
`;

/* Skeleton */

const shimmerAnimation = keyframes`
    100% {
        transform: translateX(100%);
    }
`;
export const ResultBoxItemSkeleton = styled.div<{ $h?: string; w?: string }>`
  width: ${(props) => props.w || "100%"};
  border-radius: 20px;
  height: ${(props) => props.$h || "0.8rem"};
  background-color: ${(props) => props.theme.disabledButtonBg};
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: ${(props) =>
      props.theme.MODE === "dark"
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0));"
        : "linear-gradient(90deg,rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.2) 20%,rgba(255, 255, 255, 0.5) 60%,rgba(255, 255, 255, 0));"};
    animation: ${shimmerAnimation} 0.8s infinite;
    content: "";
  }
`;
