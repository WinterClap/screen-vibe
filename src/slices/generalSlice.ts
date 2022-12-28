import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { locales } from "../constants/locales";
import { countries } from "../constants/countries";

export type GeneralSliceState = {
  shouldShowSplashScreen: boolean;
  shouldShowLocaleSelectionModal: boolean;
  locale: `${typeof locales[number]}-${typeof countries[number]["code"]}` | null;
};

const initialState: GeneralSliceState = {
  shouldShowSplashScreen: true,
  shouldShowLocaleSelectionModal: false,
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
  },
});

export const { setShouldShowSplashScreen, setLocale, setShouldShowLocaleSelectionModal } = generalSlice.actions;
