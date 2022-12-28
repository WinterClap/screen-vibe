import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 0.7em;
    }

    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.defaultBackground};
    }

    ::-webkit-scrollbar-thumb {
        outline: none;
        border-radius:10px;
        min-height:30px;
        background-color: ${(props) => props.theme.text + "4a"};

        &:hover {
            background-color: ${(props) => props.theme.text + "5a"};
        }

        &:focus {
            background-color: ${(props) => props.theme.text + "6a"};
        }
    }
`;

export default GlobalStyle;
