import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    100%{
       transform: rotate(360deg)
    }
`;

export const CircularLoaderContainer = styled.div<{ $size?: number; $strokeWidth?: string; $color?: string }>`
  border-radius: 50%;
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
  border-top: ${(props) => props.$strokeWidth || (props.$size && props.$size * 0.1 + "px")} solid
    ${(props) => props.$color || props.theme.text};

  animation: ${rotateAnimation} 0.5s ease-in infinite;
`;
