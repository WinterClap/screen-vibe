import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const SplashContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  border: 1px solid black;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.defaultBackground};
`;

export const SplashBackgroundMock = styled.div<{ $visible: boolean }>`
  position: fixed;
  background-color: ${(props) => props.theme.defaultBackground};
  inset: 0;
  z-index: 1;
  ${(props) => !props.$visible && "display: none;"};
`;

export const AmbienceBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0px 0px 100px 20px ${(props) => props.theme.primary};
`;

/** LocaleSelectionModal */

export const LocaleSelectionModalContainer = styled.div`
  width: 640px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: auto;
  }
`;
