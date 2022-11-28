import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    terciary: string;
    dark: string;
    light: string;
    black: string;
    danger: string;
    softDanger: string;
    warning: string;
    softWarning: string;
    success: string;
    softSuccess: string;
    info: string;
    softInfo: string;
  }
}
