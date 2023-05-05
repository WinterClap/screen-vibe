import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const AccordionItemContainer = styled.div`
  width: 100%;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

export const AccordionItemHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) => props.theme.disabledButtonBg};

  a {
    color: ${(props) => props.theme.primary};
    font-size: 0.7rem;

    &:hover {
      color: ${(props) => props.theme.primaryHover};
      text-decoration: underline;
    }
  }
`;

export const AccordionItemContent = styled(motion.div)<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background-color: ${(props) => props.theme.disabledButtonBg};
  border-radius: 0px 0px 10px 10px;
  padding-bottom: ${(props) => (!props.$isOpen ? 0 : 1)}rem;
`;

export const EmptyListPlaceholderContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

export const DefaultItemContent = styled.div`
  border-radius: 10px;
  padding: 10px 10px 20px 10px;
  border: 2px dashed ${(props) => props.theme.dimmedText};
`;

export const DefaultItemContentPlaceholder = styled.div`
  border-radius: 15px;
  padding: 10px;
  background-color: ${(props) => props.theme.disabledButtonBg};
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }

  &:last-of-type {
    width: 75%;
  }
`;

export const DimmedItemHeader = styled.h6`
  font-size: 0.8rem;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
  text-align: center;
  color: ${(props) => props.theme.dimmedText};
`;

export const AccordionItemHeaderText = styled.h6`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  user-select: none;
  cursor: pointer;
`;

export const DimmedItemDescription = styled.p<{ $alignSelf?: string }>`
  margin: 0px 0px 10px 0px;
  font-size: 0.7rem;
  align-self: ${(props) => props.$alignSelf || "auto"};
  color: ${(props) => props.theme.dimmedText};
`;

/* Item Skeleton Styles */

const shimmerAnimation = keyframes`
    100% {
        transform: translateX(100%);
    }
`;

export const AccordionItemSkeleton = styled.div`
  width: 100%;
  height: 200px;
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

export const AccordionItemSkeletonContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
`;

export const AccordionItemTextSkeleton = styled.div`
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

export const AccordionMediaOptionContainer = styled.button<{ $selected: boolean; $isOpen: boolean }>`
  all: unset;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.1rem 0.25rem;
  border-radius: 0.2rem;
  background-color: ${(props) => (props.$selected ? props.theme.primary : "transparent")};
  color: ${(props) => (props.$selected ? props.theme.white : "inherit")};
  transition: all 0.15s ease-in-out;
  user-select: none;

  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};

  &:hover {
    ${(props) =>
      !props.$selected &&
      `background-color: ${props.theme.MODE === "light" ? props.theme.softDimmedText : props.theme.dimmedInputFocus}`}
  }
`;

/* Content */

export const AccordionItemContentContainer = styled(motion.div)`
  width: 100%;
`;

export const AccordionContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0.5rem;
  max-height: 600px;
  overflow-y: scroll;
  width: 100%;
`;

export const AccordionContentPosterContainer = styled.div`
  position: relative;
  border-radius: 0.5rem;
  width: 100%;
  min-height: 140px;
  overflow: hidden;
  user-select: none;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    > button {
      opacity: 1;
    }
  }
`;

export const AccordionContentTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

export const RemoveButtonContainer = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  position: absolute;
  border: none;
  z-index: 2;
  padding: 0.25rem;
  background-color: ${(props) => props.theme.defaultBackground};
  cursor: pointer;
  outline: transparent;
  overflow: hidden;
  border-radius: 50%;
  transition: all 0.15s ease-in-out;
  opacity: 0;
  box-shadow: ${(props) =>
    props.theme.MODE === "dark"
      ? "0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.62), 0 9px 28px 8px rgba(0, 0, 0, 0.45)"
      : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"};

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    background-color: transparent;
  }

  > svg {
    color: ${(props) => props.theme.text};
  }
`;
