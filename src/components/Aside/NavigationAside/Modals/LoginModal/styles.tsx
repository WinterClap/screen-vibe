import styled from "styled-components";
import { DEVICE_SIZES } from "../../../../../constants";

export const LoginModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: 100%;
  }
`;
