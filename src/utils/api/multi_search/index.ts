import { SearchMultiData, SearchMultiDetails } from "../../../../pages/api/search/multi";
import { getCountryAndLanguageFromLocale } from "../../../components/SplashScreen/utils";
import { GeneralSliceState } from "../../../slices/generalSlice";

type GetMultiSearchParams = {
  query: string;
  locale: GeneralSliceState["locale"];
  include_adult: boolean;
  page?: number;
};

export const getMultiSearch = ({ locale, query, include_adult, page = 1 }: GetMultiSearchParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Invalid call params");

  return new Promise<SearchMultiDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/search/multi?" +
          new URLSearchParams({
            query,
            language: locale as string,
            page: page.toString(),
            region: localeInfo.country,
            include_adult: include_adult.toString(),
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as SearchMultiDetails;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
