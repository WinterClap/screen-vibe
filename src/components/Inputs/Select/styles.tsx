import { motion } from "framer-motion";
import styled from "styled-components";

export const SelectContainer = styled.div<{ $maxWidth?: string; $minWidth?: string }>`
  max-width: ${(props) => props.$maxWidth || "300px"};
  min-width: ${(props) => props.$minWidth || "280px"};
  outline: none;
  position: relative;
`;

export const InputSearchContainer = styled.div<{ $isFocused?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid ${(props) => (props.$isFocused ? (props) => props.theme.highlightInput : props.theme.blurredInput)};
  border-radius: 15px;
  transition: all 0.3s ease-out;
  background-color: transparent;
`;

export const InputInlineIcon = styled.div<{ $iconOffset?: string }>`
  position: absolute;
  inset: auto ${(props) => props.$iconOffset || "40px"} auto auto;
  width: fit-content;
  user-select: none;
`;

export const InputSearch = styled.input<{ $fontSize?: string }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  appearance: none;
  border: none;
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: ${(props) => props.$fontSize || "0.95rem"};
  padding: 0.8rem 0.5rem;
  outline: none;
  background-color: transparent;
  border-radius: 15px;
  &::placeholder {
    color: ${(props) => props.theme.dimmedText};
  }
  color: ${(props) => props.theme.text};
`;

export const ResultTooltipContainer = styled(motion.div)<{ $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  max-height: ${(props) => props.$maxHeight || "5rem"};
  overflow: auto;
  background-color: ${(props) => props.theme.defaultBackground};
  position: absolute;
  z-index: 2;
  width: 100%;
  margin-top: 5px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.blurredInput};
  box-shadow: ${(props) =>
    props.theme.MODE === "dark"
      ? "0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.62), 0 9px 28px 8px rgba(0, 0, 0, 0.45)"
      : "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"};
`;

export const EmptyListPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  align-items: center;
`;

export const EmptyListText = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: ${(props) => props.theme.dimmedText};
`;

export const Label = styled.label`
  color: ${(props) => props.theme.dimmedText};
  margin-bottom: 5px;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const OptionBox = styled(motion.div)`
  border-radius: 5px;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.15s linear;

  &:hover,
  &[data-focused="true"] {
    background-color: ${(props) => props.theme.dimmedInputFocus};
  }
  &[data-selected="true"] {
    background-color: ${(props) => props.theme.primaryInputFocus};
    color: ${(props) => props.theme.highlightInput};
    font-weight: 600;
  }
`;

export const OptionText = styled(motion.p)`
  display: inline-block;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9rem;
  &[data-focused="true"] {
    font-weight: 600;
  }
`;
export const OptionIconContainer = styled.div``;
