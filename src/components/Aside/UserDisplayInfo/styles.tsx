import styled from "styled-components";

export const UserDisplayInfoContainer = styled.div<{ $size?: "small" | "normal" }>`
  margin-bottom: ${(props) => (props.$size === "small" ? "0px" : "12px")};
  width: ${(props) => (props.$size === "normal" ? "100%" : "auto")};
  cursor: ${(props) => (props.$size === "normal" ? "unset" : "pointer")};
  ${(props) => props.$size === "normal" && "display: flex; justify-content: flex-start; align-items: center; gap: 10px"}
`;

export const UserText = styled.p<{ $highlight?: boolean }>`
  margin: 0;
  font-weight: ${(props) => (props.$highlight ? 600 : 400)};
  font-size: ${(props) => (props.$highlight ? "0.85rem" : "0.7rem")};
`;

export const UserLinkButton = styled.button`
  margin: 0;
  padding: 0;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${(props) => props.theme.primary};

  &:hover {
    text-decoration: underline;
  }
`;

export const ImageContainer = styled.div<{ $size: "small" | "normal" }>`
  height: ${(props) => (props.$size === "normal" ? 40 : 35)}px;
  width: ${(props) => (props.$size === "normal" ? 40 : 35)}px;
  border-radius: 50%;
  position: relative;
`;

export const UserDisplayCol = styled.div<{ $size: "small" | "normal" }>`
  display: ${(props) => (props.$size === "normal" ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
`;
