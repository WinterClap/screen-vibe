import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { locales } from "../constants/locales";
import { countries } from "../constants/countries";

export type GeneralSliceState = {
  themeMode: "dark" | "light";
  shouldShowSplashScreen: boolean;
  shouldShowLocaleSelectionModal: boolean;
  shouldShowPreferencesModal: boolean;
  shouldShowLoginModal: boolean;
  locale: `${typeof locales[number]}-${typeof countries[number]["code"]}` | null;
};

const initialState: GeneralSliceState = {
  themeMode: "light",
  shouldShowSplashScreen: true,
  shouldShowLocaleSelectionModal: false,
  shouldShowPreferencesModal: false,
  shouldShowLoginModal: false,
  locale: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setShouldShowSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.shouldShowSplashScreen = action.payload;
    },
    setLocale: (state, action: PayloadAction<GeneralSliceState["locale"]>) => {
      state.locale = action.payload;
    },
    setShouldShowLocaleSelectionModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowLocaleSelectionModal = action.payload;
    },
    setShouldShowPreferencesModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowPreferencesModal = action.payload;
    },
    setShouldShowLoginModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowLoginModal = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<GeneralSliceState["themeMode"]>) => {
      state.themeMode = action.payload;
    },
  },
});

export const {
  setShouldShowSplashScreen,
  setLocale,
  setShouldShowLocaleSelectionModal,
  setShouldShowPreferencesModal,
  setShouldShowLoginModal,
  setThemeMode,
} = generalSlice.actions;
