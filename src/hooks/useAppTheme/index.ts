import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./../../store/";
import { lightTheme, darkTheme } from "../../../theme";
import { PREFERRED_THEME_KEY } from "./constants";
import { GeneralSliceState, setThemeMode } from "../../slices/generalSlice";

const useAppTheme = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.general.themeMode);

  const getPreferredTheme = React.useCallback((): GeneralSliceState["themeMode"] => {
    const preferredTheme = localStorage.getItem(PREFERRED_THEME_KEY);
    if (preferredTheme === null) {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    }
    return preferredTheme as GeneralSliceState["themeMode"];
  }, []);

  React.useEffect(() => {
    dispatch(setThemeMode(getPreferredTheme()));
  }, [dispatch, getPreferredTheme]);

  const toggleTheme = () => {
    themeMode === "dark" ? dispatch(setThemeMode("light")) : dispatch(setThemeMode("dark"));
  };

  const saveTheme = (themeMode: GeneralSliceState["themeMode"]) => {
    localStorage.setItem(PREFERRED_THEME_KEY, themeMode);
  };

  return { theme: themeMode === "dark" ? darkTheme : lightTheme, toggleTheme, saveTheme };
};

export default useAppTheme;
