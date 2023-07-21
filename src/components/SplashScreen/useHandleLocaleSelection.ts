import React from "react";
import { useDispatch } from "react-redux";
import { countries } from "../../constants/countries";
import { languages } from "../../constants/languages";
import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME } from "../../cookie-constants";
import { setShouldShowLocaleSelectionModal, setLocale, GeneralSliceState } from "../../slices/generalSlice";
import { setToastData, ToastMessageSliceState } from "../../slices/toastMessageSlice";
import { PossibleOption } from "../Inputs/Select";
import { setCookie } from "./utils";

const useHandleLocaleSelection = () => {
  const [optionsSelected, setOptionsSelected] = React.useState<Pick<PossibleOption, "key" | "label" | "value">[]>([]);
  console.log(optionsSelected);

  const dispatch = useDispatch();

  const onOptionSelected = React.useCallback((option: Pick<PossibleOption, "key" | "label" | "value">) => {
    // setOptionsSelected((prev) => ({ ...prev, [option.key]: { ...prev[option.key], ...option } }));
    setOptionsSelected((prev) => {
      const existingObj = prev.findIndex((opt) => opt.key === option.key);
      if (existingObj >= 0) {
        prev[existingObj] = option;
        return [...prev];
      }
      return [...prev, option];
    });
  }, []);

  const onConfirmLocale = (
    options: {
      withToastMessage?: Omit<Partial<NonNullable<ToastMessageSliceState["toastData"]>>, "content"> & {
        content: string;
      };
    } | void
  ) => {
    const newLocale = `${optionsSelected[1].value as typeof languages[number]["code"]}-${
      optionsSelected[0].value as typeof countries[number]["code"]
    }` as const;
    dispatch(setLocale(newLocale as GeneralSliceState["locale"]));
    setCookie({
      name: LOCALE_COOKIE_NAME,
      value: newLocale,
      maxAge: LOCALE_COOKIE_MAX_AGE,
    });
    dispatch(setShouldShowLocaleSelectionModal(false));
    if (options && options.withToastMessage) {
      dispatch(setToastData(options.withToastMessage));
    }
  };

  return { onConfirmLocale, onOptionSelected, optionsSelected };
};

export default useHandleLocaleSelection;
