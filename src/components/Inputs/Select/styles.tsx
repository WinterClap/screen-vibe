import { motion } from "framer-motion";
import styled from "styled-components";

export const SelectContainer = styled.div<{ $maxWidth?: string; $minWidth?: string }>`
  border: 1px solid black;
  cursor: pointer;
  max-width: ${(props) => props.$maxWidth || "300px"};
  min-width: ${(props) => props.$minWidth || "280px"};
  outline: none;
`;

export const InputSearchContainer = styled.div<{ $isFocused?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid ${(props) => (props.$isFocused ? props.theme.info : props.theme.dimmedText)};
  border-radius: 15px;
  transition: all 0.15s ease-out;
`;

export const InputInlineIcon = styled.div<{ $iconOffset?: string }>`
  position: absolute;
  inset: auto ${(props) => props.$iconOffset || "40px"} auto auto;
  width: fit-content;
`;

export const InputSearch = styled.input<{ $fontSize?: string }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  cursor: pointer;
  appearance: none;
  border: 0px solid transparent;
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: ${(props) => props.$fontSize || "1rem"};
  padding: 0.8rem 0.5rem;
  outline: none;
  border-radius: 15px;
  &::placeholder {
    color: ${(props) => props.theme.dimmedText};
  }
`;

export const ResultTooltipContainer = styled(motion.div)<{ $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  max-height: ${(props) => props.$maxHeight || "5rem"};
  overflow: auto;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.dimmedText};
`;

export const OptionBox = styled.div`
  border: 1px solid yellow;
  display: flex;
  padding: 5px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.15s linear;

  &:hover,
  &[data-focused="true"] {
    background-color: ${(props) => props.theme.primary + "1a"};
  }
`;

export const OptionText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const OptionIconContainer = styled.div``;
