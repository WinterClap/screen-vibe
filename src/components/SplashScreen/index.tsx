import React from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Content from "./Content";
import type { RootState } from "../../store";
import Portal from "../Portal";
import { SplashBackgroundMock, SplashContainer } from "./styles";
import {
  GeneralSliceState,
  setLocale,
  setShouldShowLocaleSelectionModal,
  setShouldShowSplashScreen,
} from "../../slices/generalSlice";
import { getCountryAndLanguageFromLocale, getCountryFromThirdParty, getLocaleCookie, setCookie } from "./utils";
import { LOCALE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE } from "../../cookie-constants";
import LocaleSelectionModal from "./LocaleSelectionModal";

type Props = {};

const SplashScreen = ({}: Props) => {
  const { locale: lang, defaultLocale: defaultLang } = useRouter();
  console.log("locale_next: ", lang);
  const { shouldShowSplashScreen, shouldShowLocaleSelectionModal, locale } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch();

  const onLoadComplete = React.useCallback(() => {
    dispatch(setShouldShowSplashScreen(false));
  }, [dispatch]);

  const loadCriticalSync = () => {
    console.log("Loaded!");
  };

  const loadCriticalAsync = React.useCallback(async () => {
    const defaultLocale = `${defaultLang}-US`;
    const localeCookie = getLocaleCookie();

    if (localeCookie) {
      dispatch(setLocale(localeCookie as GeneralSliceState["locale"]));

      loadCriticalSync();
      onLoadComplete();
      return;
    }

    try {
      const { country } = await getCountryFromThirdParty();
      const locale = `${lang ? lang : defaultLang}-${country}` as NonNullable<GeneralSliceState["locale"]>;
      dispatch(setLocale(locale));
      setCookie({ name: LOCALE_COOKIE_NAME, value: locale, maxAge: LOCALE_COOKIE_MAX_AGE });
    } catch (error) {
      console.error(error);
      dispatch(setLocale(defaultLocale as GeneralSliceState["locale"]));
      setCookie({ name: LOCALE_COOKIE_NAME, value: defaultLocale, maxAge: LOCALE_COOKIE_MAX_AGE });
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));

    loadCriticalSync();
    dispatch(setShouldShowLocaleSelectionModal(true));
    onLoadComplete();
  }, [onLoadComplete, dispatch, lang, defaultLang]);

  React.useEffect(() => {
    loadCriticalAsync();
  }, [loadCriticalAsync]);

  React.useEffect(() => {
    return () => console.log("Unmounted");
  }, []);

  const regionInfo = locale && getCountryAndLanguageFromLocale(locale);

  return (
    <>
      <SplashBackgroundMock $visible={shouldShowSplashScreen} />
      <AnimatePresence>
        {shouldShowSplashScreen && (
          <Portal containerId="splash-screen">
            <SplashContainer
              key="splash-dynamic-container"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
              exit={{ y: -100, opacity: 0, transition: { duration: 0.5 } }}
            >
              <Content />
            </SplashContainer>
          </Portal>
        )}
        {shouldShowLocaleSelectionModal && <LocaleSelectionModal key="local-selection-modal" regionInfo={regionInfo} />}
      </AnimatePresence>
    </>
  );
};

export default SplashScreen;
