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
  user-select: none;
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
  z-index: 1;

  &:hover {
    .overview-footer {
      overflow-y: auto;
      max-height: 40%;
    }
    .header-container {
      opacity: 1;
    }
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    height: 350px;
  }
`;

export const SubcategoryItemFooter = styled(motion.div)`
  cursor: initial;
  user-select: text;
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

const skeletonOpacity = keyframes`
  100% {
    opacity: 0;
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

export const SubcategoryItemCardContainer = styled(motion.div)`
  border: 10px solid blue;
  width: 500px;
  min-height: 300px;
  max-height: 90vh;
  overflow: auto;
  position: fixed;
  background-color: ${(props) => props.theme.defaultBackground};

  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    display: none;
  }
`;

export const SubcategoryItemCardBackdrop = styled(motion.div)`
  inset: 0;
  border: 10px solid red;
  position: absolute;
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0,0,0,0.15)")};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    display: none;
  }
`;

export const SubcategoryItemCardBackdropImageContainer = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  border: 5px solid yellow;
  aspect-ratio: 16/9;

  &::after {
    position: absolute;
    content: "";
    height: 50%;
    width: 100%;
    bottom: 0;
    background: ${(props) =>
      props.theme.MODE === "dark"
        ? "linear-gradient(0deg, rgba(21,21,21,1) 0%, rgba(12,12,12,0.5) 50%, rgba(0,0,0,0) 100%);"
        : "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 25%, rgba(0,0,0,0) 100%);"};
  }
`;

export const SubcategoryItemCardFooter = styled(motion.div)`
  position: relative;
  display: flex;
  border: 5px solid green;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5rem 0px;
`;

export const SubcategoryItemCardFooterText = styled.p<{ $highlight?: boolean }>`
  margin: 0;
  font-weight: ${(props) => (props.$highlight ? 700 : 400)};
  font-size: ${(props) => (props.$highlight ? 2 : 1)}rem;
  margin-bottom: ${(props) => (props.$highlight ? 2 : 0)}rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  line-height: ${(props) => (props.$highlight ? "normal" : "1.5rem")};

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: ${(props) => (props.$highlight ? 1.7 : 0.8)}rem;
  }
`;

/* GENERAL */
export const SubcategorySideBarHeader = styled.h3`
  font-size: 1.3rem;
  margin: 0;

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    font-size: 1.1rem;
  }
`;

export const SubcategorySideBarText = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

export const SubcategoryMainHeader = styled.h2`
  font-size: 1.6rem;
  margin: 0;

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    font-size: 1.3rem;
  }
`;

export const SubcategorySideBarSection = styled.div`
  width: 100%;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  span {
    margin: 0;
  }
`;

/* GenreBox */

export const GenreLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.75rem;
  margin: 0;
  &:hover {
    color: ${(props) => props.theme.dimmedText};
  }
`;

export const BoxSkeletonText = styled.div<{ $h?: string }>`
  width: 100%;
  height: ${(props) => props.$h || "1rem"};
  border-radius: 20px;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;

  &:last-of-type {
    width: 70%;
  }

  &::after {
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: ${(props) =>
      props.theme.MODE === "dark"
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0));"
        : "linear-gradient(90deg,rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.2) 20%,rgba(255, 255, 255, 0.5) 60%,rgba(255, 255, 255, 0));"};
    animation: ${shimmerAnimation} 0.8s infinite;
    content: "";
  }
`;

/* ProviderBox */

export const ProviderBoxContainer = styled.div``;

export const ProviderBoxImageContainer = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ProviderBoxSubheader = styled.h4`
  font-size: 0.8rem;
  margin: 0;
  margin: 0.5rem 0 0.25rem 0;
`;

/* CastBox */

export const CastBoxContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

export const CastBoxSkeletonContainer = styled(motion.div)<{ $shouldShowVignete?: boolean }>`
  border-radius: 20px;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px 5px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 1rem;
  overflow: hidden;
  position: relative;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 0.5rem;
  }

  ${(props) =>
    props.$shouldShowVignete &&
    css`
      &::after {
        position: absolute;
        content: "";
        height: 100px;
        bottom: 0;
        width: 100%;
        background: ${(props) =>
          props.theme.MODE === "dark"
            ? "linear-gradient(0deg, rgba(21, 21, 21, 1) 0%, rgba(12, 12, 12, 1) 25%, rgba(0, 0, 0, 0) 100%)"
            : "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,0) 100%)"};
      }
    `}
`;

export const CastBoxSkeletonItem = styled.div`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 50%;
  background-color: ${(props) => props.theme.disabledButtonBg};
  animation: ${skeletonOpacity} 0.5s linear infinite alternate;
  margin-bottom: 0.5rem;
`;

export const CastBoxItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

export const CastBoxItemTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  width: 100%;
  display: -webkit-box;
  text-align: center;

  @media (max-width: 500px) {
    word-break: break-all;
    font-size: 0.75rem;
  }
`;

export const CastBoxItemDescription = styled.p`
  font-size: 0.7rem;
  font-weight: 500;
  width: 100%;
  margin: 0;
  text-align: center;
`;

export const CastBoxSkeletonItemContainer = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  min-width: 50px;
`;

/* Header */

export const HeaderContainer = styled.div<{ $type: "item" | "card" }>`
  padding: ${(props) => (props.$type === "card" ? 0.25 : 0.6)}rem 0.5rem 0.25rem 0.25rem;
  position: relative;
  z-index: 1;
  cursor: pointer;
  border-radius: 0 0 15px 15px;
  opacity: ${(props) => (props.$type === "item" ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0, 0, 0, 0.2)")};
  backdrop-filter: blur(3px);

  ${(props) =>
    props.$type === "card" &&
    css`
      width: 95%;
      margin: 5px auto 0 auto;
      border-radius: 20px;
    `}
`;

/* RatingBox */
export const RatingBoxContainer = styled(motion.div)`
  margin-top: 0.5rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid yellow;
`;

export const RatingBoxInnerContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  gap: 15px;
`;

export const AverageRatingContainer = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  padding: 1rem 0.5rem;
  border-radius: 12px;
  font-weight: bold;
  background-color: rgba(21, 21, 21, 0.4);

  font-size: 2rem;
  margin: 0;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 1.5rem;
  }
`;

export const RatingBoxSubheader = styled.h3`
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
`;

export const RatingBoxDimmedText = styled.p`
  font-size: 0.6rem;
  margin: 0;
  color: ${(props) => props.theme.dimmedText};
`;

export const RatingBoxSkeletonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
  padding: 0 0.5rem;
`;

export const AverageRatingSkeletonContainer = styled.div`
  border-radius: 15px;
  height: 60px;
  width: 80px;
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.disabledButtonBg};

  &::after {
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: ${(props) =>
      props.theme.MODE === "dark"
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0));"
        : "linear-gradient(90deg,rgba(255, 255, 255, 0) 0,rgba(255, 255, 255, 0.2) 20%,rgba(255, 255, 255, 0.5) 60%,rgba(255, 255, 255, 0));"};
    animation: ${shimmerAnimation} 0.8s infinite;
    content: "";
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    height: 40px;
    width: 60px;
  }
`;

export const StarSkeleton = styled.div`
  border-radius: 15px;
  height: 40px;
  width: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    color: ${(props) => props.theme.dimmedText};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 30px;
    text-align: center;
    line-height: 2.4rem;
    animation: ${skeletonOpacity} 0.5s alternate infinite;
    content: "\\2605";
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    height: 20px;
    width: 20px;
    &::before {
      font-size: 20px;
      line-height: 1.2rem;
    }
  }
`;

/* Rating */
export const RatingContainer = styled(motion.div)`
  border: 1px solid orange;
  display: flex;
`;

export const RatingStarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

export const RatingStarsSetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const StarControllerBox = styled.div<{ $width: string }>`
  width: ${(props) => props.$width};
  overflow: hidden;
  position: absolute;
  border: 1px solid white;
  font-size: 40px;
  height: 40px;
  transition: width 0.1s ease-in-out;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    height: 30px;
    font-size: 30px;
  }
`;

export const StarResponsiveController = styled.div`
  font-size: 40px;
  display: flex;
  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 30px;
  }
`;

export const DynamicVoteBox = styled(motion.div)`
  display: flex;
  flex-direction: column;

  /* @media (max-width: ${DEVICE_SIZES.tablet}) {
    margin-top: 0.25rem;
  } */
`;
