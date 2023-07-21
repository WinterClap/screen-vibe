import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const PageContainer = styled.section`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: background-color 0s;
    transition-delay: 1s;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.text + "4a"};
      transition-delay: 1s;
      &:hover {
        background-color: ${(props) => props.theme.text + "5a"};
      }

      &:focus {
        background-color: ${(props) => props.theme.text + "6a"};
      }
    }
  }

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    padding: 0.5rem 0.5rem 1rem 0.5rem;
  }
`;
