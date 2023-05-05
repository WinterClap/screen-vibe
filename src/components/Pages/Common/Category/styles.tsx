import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { DEVICE_SIZES } from "../../../../constants";

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HandleContainer = styled(motion.button)`
  width: 1.5rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 5px;
  backdrop-filter: blur(3px);
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.5)")};

  svg {
    transform: scale(1.2);
    transition: transform 0.15s ease-in-out;
  }

  &:hover {
    svg {
      transform: scale(1.5);
    }
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: none;
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

export const HeaderText = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    font-size: 1.2rem;
  }
`;

export const CategorySliderContainer = styled.div<{ $x: string }>`
  display: flex;
  border: 1px solid yellow;
  /* overflow: hidden; */
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.$x});
  width: calc(100% - 3rem);
  z-index: 1;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    scroll-snap-type: x mandatory;
    width: 100%;
    overflow-x: auto;
    transform: translateX(0%);
  }
`;

export const SliderButtonContainer = styled.button`
  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: none;
  }
`;

/* CATEGORY ITEM */

export const CategoryItemText = styled.p<{ $highlight?: boolean }>`
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  color: ${(props) => props.theme.white};
  font-weight: ${(props) => (props.$highlight && 600) || 400};
  font-size: ${(props) => (props.$highlight && "0.8rem") || "0.75rem"};
`;

export const CategoryItemFooter = styled.div`
  inset: auto 0 0 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  align-items: center;
  border: 1px solid green;
  transition: all 0.3s 0s;
  padding: 0.2rem 0.5rem;
  pointer-events: none;

  &::before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
  }
  margin: 0.5rem;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    margin: 0.25rem;

    inset: auto 0 2px 0;

    &::before {
      border-radius: 0 0 5px 5px;
      /* margin: 0.25rem; */
    }
  }
`;

export const CategoryItemContainer = styled(motion.div)`
  /* overflow: hidden; */
  scroll-snap-align: start;
  max-width: 50%;
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 15px;
  flex: 0 0 50%;
  cursor: pointer;
  z-index: 0;
  transition: transform 0.25s ease-in-out, z-index 0s step-end 0.25s;

  &:nth-child(odd) {
    border: 2px solid white;
    transform-origin: left top;
  }
  //  Refactor (?)
  &:nth-child(even) {
    border: 2px solid blue;
    transform-origin: right top;
  }

  &:hover {
    transition: transform 0.3s ease-in-out 0.5s;
    transform: scale(1.8);
    &:nth-child(odd) {
      border: 2px solid white;
      transform-origin: left top;
    }
    z-index: 1;
    overflow: hidden;
    transform-origin: right top;
    img {
      transition: padding 0s 0.5s;
      padding: 0.25rem;
    }

    > div {
      margin: 0.25rem;
      transition: all 0.3s 0.5s;

      p {
        transition: white-space 0s 0.5s;
        white-space: normal;
      }
    }

    .header-container {
      opacity: 1;
    }
  }

  img {
    padding: 0.5rem;
    transition: padding 0.25s;
  }

  &::after {
    margin: 0.25rem;
    /* border-radius: 10px; // MAYBE 15px */
    content: "";
    position: absolute;
    inset: 0 0 0 0;
    background: linear-gradient(0deg, rgba(21, 21, 21, 1) 0%, rgba(12, 12, 12, 0.7) 10%, rgba(0, 0, 0, 0) 100%);
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    img {
      padding: 0.25rem;
      border-radius: 15px;
    }
    flex: 0 0 100%;
    max-width: 100%;

    &:hover {
      transform: none;
      img {
        transform: none;
        transition: none;
        padding: 0.25rem;
      }
    }
  }
`;

/* SKELETON */

const shimmerAnimation = keyframes`
    100% {
        transform: translateX(100%);
    }
`;

export const CategoryContainer = styled.section`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const CategoryTextSkeleton = styled.span<{ $width: number }>`
  width: ${(props) => props.$width}px;
  border-radius: 20px;
  height: 1.5rem;
  background-color: ${(props) => props.theme.disabledButtonBg};
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: ${(props) => props.$width * 0.7}px;
  }

  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    width: ${(props) => props.$width * 0.3}px;
  }

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

export const CategoryItemSkeleton = styled.span<{ $size: "normal" | "small" }>`
  width: 30%;
  height: ${(props) => (props.$size === "normal" ? 150 : 100)}px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;
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
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0));"
        : "linear-gradient(90deg,rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.2) 20%,rgba(255, 255, 255, 0.5) 60%,rgba(255, 255, 255, 0));"};
    animation: ${shimmerAnimation} 0.8s infinite;
    content: "";
  }
`;

export const CategoryContainerSkeleton = styled.div`
  border: 1px solid red;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  transform: translate3d(0, 0, 0);

  &:not(:last-of-type) {
    margin-bottom: 20px;
    @media (max-width: ${DEVICE_SIZES.tablet}) {
      margin-bottom: 10px;
    }
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 5px 10px;
  }
`;

/* PAGE CONTENT CONTAINER */

export const CategoryContentContainer = styled.div`
  padding: 1rem;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 0;
  }
`;
