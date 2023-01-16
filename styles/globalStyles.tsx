import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        overflow: hidden;
        color: ${(props) => props.theme.text};
        &::-webkit-scrollbar-track {
            background-color: ${(props) => props.theme.defaultBackground};
        }
    }

    ::-webkit-scrollbar {
        width: 0.5em;
        height: 0.6em;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        outline: none;
        border-radius:10px;
        min-height:30px;
        /* transition: background-color 0.15s ease-in; */
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
