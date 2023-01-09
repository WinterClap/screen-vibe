import { motion } from "framer-motion";
import styled from "styled-components";

export const DotsLoaderContainer = styled(motion.div)`
  display: flex;
  height: 16px;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
`;

export const Dot = styled(motion.div)<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;
