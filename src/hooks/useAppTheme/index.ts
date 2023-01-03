import { DefaultTheme } from "styled-components";
import { lightTheme } from "./../../../theme";
import React from "react";
import { darkTheme } from "../../../theme";
import { PREFERRED_THEME_KEY } from "./constants";

const useAppTheme = () => {
  const [theme, setTheme] = React.useState<DefaultTheme>(lightTheme);

  const getPreferredTheme = React.useCallback(() => {
    const preferredTheme = localStorage.getItem(PREFERRED_THEME_KEY);
    if (preferredTheme === null) {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches ? darkTheme : lightTheme;
    }
    return preferredTheme === "dark" ? darkTheme : lightTheme;
  }, []);

  React.useEffect(() => {
    setTheme(getPreferredTheme());
  }, [getPreferredTheme]);

  const toogleTheme = () => {
    theme.MODE === "dark" ? setTheme(lightTheme) : setTheme(darkTheme);
  };

  return { theme, toogleTheme };
};

export default useAppTheme;
