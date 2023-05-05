import styled from "styled-components";

export const Divider = styled.p`
  padding: 0px;
  color: ${(props) => props.theme.dimmedText};
  user-select: none;
  cursor: default;
`;

export const PaginatorButton = styled.button<{ isIndicator?: boolean; isFocused?: boolean }>`
  color: ${(props) =>
    !props.isIndicator ? props.theme.primary : props.isFocused ? props.theme.white : props.theme.dimmedText};
  cursor: pointer;
  font-size: ${(props) => (props.isIndicator ? 0.8 : 0.7)}rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.isIndicator && props.isFocused && props.theme.primary) || "transparent"};
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  line-height: normal;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.isIndicator && props.theme.white};
    background-color: ${(props) =>
      props.isIndicator
        ? props.theme.MODE === "light"
          ? props.theme.dimmedText
          : props.theme.dimmedInputFocus
        : "initial"};
  }

  &:disabled {
    color: ${(props) => props.theme.dimmedText};
    cursor: auto;

    &:hover {
      text-decoration: none;
    }
  }
`;
