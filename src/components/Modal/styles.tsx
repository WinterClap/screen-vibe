import styled from "styled-components";

export const ModalDimmedBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.15);
`;

export const ModalContainer = styled.div`
  outline: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  border-radius: 10px;
  overflow: auto;
  height: fit-content;
  max-height: 90vh;
  max-width: 90vw;
  min-width: 310px;
  background-color: ${(props) => props.theme.defaultBackground};
`;
