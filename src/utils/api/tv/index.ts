import { getCountryAndLanguageFromLocale } from "../../../components/SplashScreen/utils";
import type { TvCreditsDetails } from "../../../../pages/api/tv/credits";
import type { PopularTvDetails } from "../../../../pages/api/tv/popular";
import type { GeneralSliceState } from "../../../slices/generalSlice";
import type { GenreTvList } from "../../../../pages/api/genre/tv/list";
import type { TvAccountStatesDetails } from "../../../../pages/api/tv/account_states";
import type { TvWatchProvidersDetails } from "../../../../pages/api/tv/watch/providers";
import type { TopRatedTvDetails } from "../../../../pages/api/tv/top_rated";
import type { AiringTodayTvDetails } from "../../../../pages/api/tv/airing_today";
import type { OnTheAirTvDetails } from "../../../../pages/api/tv/on_the_air";

/* GENRES */
type GetGenreTvListParams = {
  locale: GeneralSliceState["locale"];
};

export const getGenreTvList = async ({ locale }: GetGenreTvListParams) => {
  if (!locale) return Promise.reject("Missing required fields");
  return new Promise<GenreTvList>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/genre/tv/list?" +
          new URLSearchParams({
            locale,
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as GenreTvList;
      if ("genres" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* CREDITS */
type GetCreditsForTvParams = {
  tv_id: number;
  locale: GeneralSliceState["locale"];
};

export const getCreditsForTv = async ({ tv_id, locale }: GetCreditsForTvParams) => {
  if (!tv_id || !locale) return Promise.reject("Missing required fields");

  return new Promise<TvCreditsDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/credits?" + new URLSearchParams({ tv_id: tv_id.toString(), locale: locale as string })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TvCreditsDetails;
      if ("cast" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* GET Popular */
type GetPopularTvParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};
export const getPopularTv = ({ locale, page = 1 }: GetPopularTvParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<PopularTvDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/popular?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as PopularTvDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* GET Airing Today */
type GetAiringTodayTvParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};
export const getAiringTodayTv = ({ locale, page = 1 }: GetAiringTodayTvParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<AiringTodayTvDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/airing_today?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as AiringTodayTvDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* GET On The Air Today */

type GetOnTheAirTvParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};
export const getOnTheAirTv = ({ locale, page = 1 }: GetOnTheAirTvParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<OnTheAirTvDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/on_the_air?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as OnTheAirTvDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* GET Top Rated */
type GetTopRatedTvParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};
export const getTopRatedTv = ({ locale, page = 1 }: GetTopRatedTvParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<TopRatedTvDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/top_rated?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TopRatedTvDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* Account States */

type GetAccountStatesForTvParams = {
  tv_id: number;
  session_id: string | null;
};

export const getAccountStatesForTv = async ({ tv_id, session_id }: GetAccountStatesForTvParams) => {
  if (!tv_id || !session_id) return Promise.reject("Missing required fields");
  return new Promise<TvAccountStatesDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/account_states?" +
          new URLSearchParams({
            session_id,
            tv_id: tv_id.toString(),
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TvAccountStatesDetails;
      if ("id" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

/* Watch providers */

type GetWatchProvidersForTvParams = {
  tv_id: number;
};

export const getWatchProvidersForTv = async ({ tv_id }: GetWatchProvidersForTvParams) => {
  if (!tv_id) return Promise.reject("Missing required fields");
  return new Promise<TvWatchProvidersDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/watch/providers?" +
          new URLSearchParams({
            tv_id: tv_id.toString(),
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TvWatchProvidersDetails;
      if ("results" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
