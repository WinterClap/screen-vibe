import styled from "styled-components";

export const NoDataErrorContainer = styled.div`
  border-radius: 15px;
  background-color: ${(props) => props.theme.dimmedInputFocus};
  padding: 2rem;
  width: 600px;

  p {
    margin: 0;
    font-weight: bold;
    font-size: larger;
    color: ${(props) => props.theme.dimmedText};
  }

  .icon {
    color: ${(props) => props.theme.dimmedText};
  }
`;
