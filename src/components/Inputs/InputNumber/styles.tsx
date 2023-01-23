import styled, { css } from "styled-components";

export const InputContainer = styled.span<{ $maxWidth?: string }>`
  display: inline-block;
  max-width: ${(props) => props.$maxWidth};
`;
export const InputTypeNumber = styled.input`
  width: 100%;
  height: 2.3rem;
  border: 2px solid transparent;
  border-radius: 15px;
  outline: none;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.theme.disabledButtonBg};
  padding: 0 1.5rem 0 0.5rem;
  color: ${(props) => props.theme.text};
  font-weight: 600;
  font-size: 0.9rem;

  &:focus {
    border: 2px solid ${(props) => props.theme.primaryHover};
  }

  &::-webkit-inner-spin-button {
    position: absolute;
    top: 1px;
    right: 1px;
    display: block;
    width: 1.4rem;
    height: calc(100% - 1px);
    padding: 0;
    appearance: none;
    color: ${(props) => props.theme.text};
    ${(props) =>
      props.theme.MODE === "dark"
        ? css`
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='22'%3E%3Cpath d='M 0.5 4.5 L 4.5 0.5 L 8.5 4.5' fill='transparent' stroke='white' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M 0.5 17.5 L 4.5 21.5 L 8.5 17.5' fill='transparent' stroke='white' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
          `
        : css`
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='22'%3E%3Cpath d='M 0.5 4.5 L 4.5 0.5 L 8.5 4.5' fill='transparent' stroke='black' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M 0.5 17.5 L 4.5 21.5 L 8.5 17.5' fill='transparent' stroke='black' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
          `}
    background-position: 50% 50%;
    background-repeat: no-repeat;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    cursor: pointer;
    opacity: 1;
    text-align: center;
  }
`;
