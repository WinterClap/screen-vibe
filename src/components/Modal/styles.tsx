import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const ModalDimmedBackground = styled(motion.div)`
  z-index: 100;
  position: fixed;
  inset: 0;
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0,0,0,0.15)")};
`;

export const ModalContainer = styled(motion.div)<{ $overflow?: "auto" | "hidden" | "visible" }>`
  z-index: 100;
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  border-radius: 10px;
  overflow: ${(props) => props.$overflow};
  height: fit-content;
  max-height: 90vh;
  max-width: 90vw;
  min-width: 310px;
  background-color: ${(props) => props.theme.defaultBackground};
  box-shadow: ${(props) =>
    props.theme.MODE === "dark"
      ? "0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.62), 0 9px 28px 8px rgba(0, 0, 0, 0.45)"
      : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"};

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 20px 15px;
  }
`;

export const ModalFooter = styled.div<{ $justifyContent?: string }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.$justifyContent || "space-around"};
  align-items: center;
  margin-top: 20px;
`;

export const ModalHeader = styled.h3`
  font-weight: 700;
  font-size: 1.8rem;
  margin: 0 0 20px 0;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 1.5rem;
  }
`;

export const ModalSubHeader = styled.h4`
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0 0 15px 0;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 1rem;
  }
`;

export const ModalDescription = styled.p`
  text-align: justify;
  font-size: 0.8rem;
  color: ${(props) => props.theme.dimmedText};
`;

export const ModalSideBarMenuContainer = styled.aside`
  padding: 5px;
  height: 100%;
  border: 1px solid black;
`;

export const SidebarHeader = styled.button<{ $isSelected: boolean }>`
  margin: 0;
  appearance: none;
  border: none;
  border-radius: 5px;
  background: ${(props) => (props.$isSelected ? props.theme.primaryInputFocus : "none")};
  padding: 5px 10px;

  &:hover {
    background-color: ${(props) => props.theme.dimmedInputFocus};
  }

  &:focus {
    background-color: ${(props) => props.theme.dimmedInputFocus};
    color: ${(props) => props.theme.dimmedText};
  }
`;
