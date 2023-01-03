import styled from "styled-components";

export const PageContainer = styled.section`
  border: 5px solid black;
  height: 100%;
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
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
`;
