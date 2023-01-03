import styled from "styled-components";
import { DEVICE_SIZES } from "../../../../constants";

export const PreferencesModalGrid = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-columns: 200px 1fr;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const PreferencesModalContainer = styled.div`
  width: 70vw;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: 100%;
  }
`;
