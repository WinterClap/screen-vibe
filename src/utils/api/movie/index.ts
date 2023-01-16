import { getCountryAndLanguageFromLocale } from "../../../components/SplashScreen/utils";
import type { GeneralSliceState } from "../../../slices/generalSlice";
import type { PopularMovieData } from "../../../../pages/api/movie/popular";

type GetPopularMoviesArgs = {
  locale: GeneralSliceState["locale"];
  page?: number;
};

export const getPopularMovies = async ({ locale, page = 1 }: GetPopularMoviesArgs) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return;

  try {
    const result = await fetch(
      "/api/movie/popular?" +
        new URLSearchParams({
          language: localeInfo.lang,
          region: localeInfo.country,
          page: `${page}`,
        })
    );
    const json = (await result.json()) as PopularMovieData;
    if ("page" in json) {
      return json;
    }
  } catch (error) {
    console.log(error);
  }
};
