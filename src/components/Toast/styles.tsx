import { motion } from "framer-motion";
import styled from "styled-components";

export const ToastMessageContainer = styled(motion.div)`
  z-index: 999;
  background-color: ${(props) => (props.theme.MODE === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255, 255, 255, 0.2)")};
  backdrop-filter: blur(8px);
  cursor: pointer;
  min-width: 310px;
  max-width: 500px;
  border-radius: 20px;
  padding: 1rem 2rem;
  position: fixed;
  overflow: hidden;
  left: 50%;
`;

export const ToastMessageHeader = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
`;

export const ToastMessageContent = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
  user-select: none;
  display: inline-block;
  cursor: pointer;
`;
