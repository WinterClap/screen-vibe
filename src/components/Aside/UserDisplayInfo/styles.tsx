import styled from "styled-components";

export const UserDisplayInfoContainer = styled.div<{ $size?: "small" | "normal" }>`
  margin-bottom: ${(props) => (props.$size === "small" ? "10px" : "12px")};
  width: ${(props) => (props.$size === "normal" ? "100%" : "auto")};
  cursor: pointer;
`;

export const ImageContainer = styled.div<{ $size: "small" | "normal" }>`
  height: ${(props) => (props.$size === "normal" ? 40 : 35)}px;
  width: ${(props) => (props.$size === "normal" ? 40 : 35)}px;
  border-radius: 50%;
  position: relative;
`;
