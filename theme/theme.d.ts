import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    MODE: "light" | "dark";
    primary: string;
    secondary: string;
    defaultBackground: string;
    text: string;
    textInverse: string;
    terciary: string;
    dark: string;
    light: string;
    black: string;
    white: string;
    danger: string;
    softDanger: string;
    warning: string;
    softWarning: string;
    success: string;
    softSuccess: string;
    info: string;
    softInfo: string;
    softDimmedText: string;
    dimmedText: string;
    dimmedInputFocus: string;
    primaryInputFocus: string;
    highlightInput: string;
    primaryHover: string;
    blurredInput: string;
    primaryButtonHover: string;
    secondaryButtonHover: string;
    disabledButtonBg: string;
    focusButtonSecondary: string;
    focusButtonPrimary: string;
    focusPrimarySoft: string;
  }
}
