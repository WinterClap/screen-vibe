import { motion } from "framer-motion";
import styled, { keyframes, css } from "styled-components";
import { DEVICE_SIZES } from "../../../../constants";

export const SubcategoryPageTitle = styled.h1`
  font-weight: 700;
  margin-top: 0;
`;

export const SubcategoryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid white;
`;

export const SubcategoryItemContainer = styled(motion.div)`
  border: 1px solid red;
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  height: 400px;
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover {
    .overview-footer {
      overflow-y: auto;
      max-height: 40%;
    }
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    height: 350px;
  }
`;

export const SubcategoryItemFooter = styled.div`
  cursor: initial;
  transition: max-height 0.3s ease-out;
  max-height: 25%;
  width: 100%;
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0, 0, 0, 0.5)")};
  backdrop-filter: blur(4px);
  position: absolute;
  bottom: 0;
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
  color: ${(props) => props.theme.white};

  ${(props) =>
    props.theme.MODE === "light" &&
    css`
      ::-webkit-scrollbar-thumb {
        &:focus {
          background-color: ${(props) => props.theme.textInverse + "6a"};
        }
        &:hover {
          background-color: ${(props) => props.theme.textInverse + "5a"};
        }
        background-color: ${(props) => props.theme.textInverse + "4a"};
      }
    `}
`;

export const SubcategoryItemText = styled.p<{ $highlight?: boolean }>`
  padding: 0;
  margin: 0;
  flex: 0 0 auto;
  font-weight: ${(props) => (props.$highlight && 600) || 400};
  font-size: ${(props) => (props.$highlight && "0.80rem") || "0.75rem"};
  min-width: 0;
  overflow: hidden;

  ${(props) =>
    props.$highlight && "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; margin-bottom: 3px"}
`;

/* SKELETON */

const shimmerAnimation = keyframes`
    100% {
        transform: translateX(100%);
    }
`;

export const SubcategoryItemContainerSkeleton = styled.div`
  height: 400px;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubcategoryItemTextSkeleton = styled.div`
  width: 100%;
  border-radius: 3px;
  height: 0.5rem;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;

  &:last-of-type {
    width: 70%;
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
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0));"
        : "linear-gradient(90deg,rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.2) 20%,rgba(255, 255, 255, 0.5) 60%,rgba(255, 255, 255, 0));"};
    animation: ${shimmerAnimation} 0.8s infinite;
    content: "";
  }
`;

export const SubcategoryItemSkeleton = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;

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

/* SubcategoryItemCard */

export const SubcategoryItemCardContainer = styled.div`
  border: 10px solid blue;
  inset: 0;
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
`;
