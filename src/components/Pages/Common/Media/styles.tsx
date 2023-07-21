/* SKELETON */

import styled, { keyframes } from "styled-components";
import { DEVICE_SIZES } from "../../../../constants";

const shimmerAnimation = keyframes`
    100% {
        transform: translateX(100%);
    }
    `;

export const SkeletonContainer = styled.div`
  padding: 2rem;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 1rem;
  }
`;

export const SkeletonRect = styled.div<{ $h?: string; $w?: string }>`
  width: ${(props) => props.$w || "100%"};
  height: ${(props) => props.$h || "300px"};
  border-radius: 2rem;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

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

export const TextSkeleton = styled.div`
  width: 100%;
  border-radius: 3px;
  height: 0.5rem;
  background-color: ${(props) => props.theme.disabledButtonBg};
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

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

/* Error page styles */
export const ErrorContainer = styled.div`
  max-width: 600px;
  display: flex;
  margin: 3rem auto;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.primaryButtonHover};
  border-radius: 20px;
`;

export const ErrorBody = styled.div`
  /* width: 100%; */
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const ErrorDimmedText = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: ${(props) => props.theme.dimmedText};
`;

export const ErrorHeader = styled.h1`
  margin: 0;
  font-size: 1.4rem;
  align-self: flex-start;
  color: ${(props) => props.theme.white};
`;

export const ErrorHeaderContainer = styled.div`
  padding: 0.5rem 0.25rem 0.5rem 0.5rem;
  background-color: ${(props) => props.theme.primaryButtonHover};
  width: 100%;
  display: flex;
  gap: 0.5rem;
`;

/* Content */

export const MediaContent = styled.div`
  padding: 1rem 3rem 0rem 3rem;
  margin-bottom: 1rem;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 0.5rem 1rem 0rem 1rem;
  }
`;

export const BackdropImageContainer = styled.div`
  position: relative;
  height: 500px;
`;

export const MediaTitle = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: ${(props) => props.theme.white};
`;

export const InformationContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > div {
    padding: 0rem 3rem;
    position: relative;
  }

  &::before {
    content: "";
    pointer-events: none;
    position: absolute;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export const DescriptionItem = styled.div`
  flex: 0 0 300px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    flex: 0 0 250px;
  }
`;

export const DescriptionItemLabel = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${(props) => props.theme.softDimmedText};

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 0.9rem;
  }
`;

export const DescriptionItemContent = styled.p`
  color: ${(props) => props.theme.white};
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
  word-break: break-all;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 1.3rem;
  }
`;

export const GenreTag = styled.p`
  padding: 0.5rem 0.5rem;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: 1px solid white;
  color: ${(props) => props.theme.white};
  margin: 0;
  cursor: default;
  font-size: 0.7rem;
`;

export const PosterImageContainer = styled.div`
  height: 400px;
  aspect-ratio: 9/16;
  position: relative;
`;

export const MediaContentHeader = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  color: ${(props) => props.theme.text};
`;

export const MediaContentText = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.text};
  font-size: 0.9rem;
`;
