import { LOCALE_COOKIE_NAME } from "../../cookie-constants";
import { GeneralSliceState } from "../../slices/generalSlice";
import { GET_COUNTRY_API_URL } from "./constants";

export const getLocaleCookie = (): string | null => {
  const result = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(LOCALE_COOKIE_NAME))
    ?.split("=")[1];

  return result ? result : null;
};

export const setCookie = ({ name, value, maxAge }: { name: string; value: string; maxAge: number }) => {
  document.cookie = `${name}=${value}; max-age=${maxAge}`;
};

interface ResponseCountryFromThirdParty {
  ip: string;
  country: string;
}

export const getCountryFromThirdParty = async () => {
  const response = await fetch(GET_COUNTRY_API_URL);
  const json = await response.json();
  return json as ResponseCountryFromThirdParty;
};

export const getCountryAndLanguageFromLocale = (locale: GeneralSliceState["locale"]) => {
  if (!locale) return;

  const [lang, country] = locale.split("-");
  return { country, lang };
};
