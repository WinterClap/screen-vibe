import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../../constants";

export const SwitchContainer = styled.div<{ $isOn: boolean }>`
  display: flex;
  width: 45px;
  padding: 5px;
  height: fit-content;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.15s ease-in-out;
  justify-content: ${(props) => (props.$isOn ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isOn ? props.theme.primary : (props) => props.theme.dimmedInputFocus)};

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: 40px;
  }
`;

export const InputCheckbox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Thumb = styled(motion.div)<{ $isOn: boolean }>`
  border-radius: 50%;
  height: 15px;
  width: 15px;
  transition: background-color 0.25s ease-in-out;
  background-color: ${(props) => (props.$isOn ? props.theme.textInverse : props.theme.dimmedText)};
`;
