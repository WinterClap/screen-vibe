import { getCountryAndLanguageFromLocale } from "../../../components/SplashScreen/utils";
import type { GeneralSliceState } from "../../../slices/generalSlice";
import type { PopularMovieData, PopularMovieDetails } from "../../../../pages/api/movie/popular";
import type { GenreList, GenreListData } from "../../../../pages/api/genre/movie/list";
import type { MovieWatchProvidersDetails } from "../../../../pages/api/movie/watch/providers";
import type { MovieCreditsData, MovieCreditsDetails } from "../../../../pages/api/movie/credits";
import type { MovieAccountStatesData, MovieAccountStatesDetails } from "../../../../pages/api/movie/account_states";
import type { TopRatedMovieDetails } from "../../../../pages/api/movie/top_rated";
import type { NowPlayingMovieDetails } from "../../../../pages/api/movie/now_playing";
import type { UpcomingMovieDetails } from "../../../../pages/api/movie/upcoming";
import type {
  AccountFavoritesData,
  AccountMoviesFavoritesDetails,
  AccountTvFavoritesDetails,
} from "../../../../pages/api/account/favorite";
import type {
  AccountMoviesWatchlistDetails,
  AccountTvWatchlistDetails,
  AccountWatchlistData,
} from "../../../../pages/api/account/watchlist";
import type { MovieDetails } from "../../../../pages/api/movie/[id]";
import type { MovieRecommendationsDetails } from "../../../../pages/api/movie/recommendations";
import type { TvRecommendationsDetails } from "../../../../pages/api/tv/recommendations";
import { TvDetails } from "../../../../pages/api/tv/[id]";

type GetMovieDetailsParams = {
  movie_id: number;
  language: GeneralSliceState["locale"];
};

export const getMovieDetails = ({ movie_id, language }: GetMovieDetailsParams) => {
  if (!language) return Promise.reject("Missing required fields");

  return new Promise<MovieDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        `/api/movie/${movie_id}?` +
          new URLSearchParams({
            language,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as MovieDetails;
      resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetPopularMoviesParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};

export const getPopularMovies = ({ locale, page = 1 }: GetPopularMoviesParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<PopularMovieDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/popular?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as PopularMovieData;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetUpcomingMoviesParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};
export const getUpcomingMovies = ({ locale, page = 1 }: GetUpcomingMoviesParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<UpcomingMovieDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/upcoming?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as UpcomingMovieDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetNowPlayingMoviesParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};

export const getNowPlayingMovies = ({ locale, page = 1 }: GetNowPlayingMoviesParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<NowPlayingMovieDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/now_playing?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as NowPlayingMovieDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetTopRatedMoviesParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};

export const getTopRatedMovies = ({ locale, page = 1 }: GetTopRatedMoviesParams) => {
  const localeInfo = getCountryAndLanguageFromLocale(locale);
  if (!localeInfo) return Promise.reject("Missing required fields");

  return new Promise<TopRatedMovieDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/top_rated?" +
          new URLSearchParams({
            language: localeInfo.lang,
            region: localeInfo.country,
            page: `${page}`,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TopRatedMovieDetails;
      if ("page" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetGenreMovieListParams = {
  locale: GeneralSliceState["locale"];
};

export const getGenreMovieList = async ({ locale }: GetGenreMovieListParams) => {
  if (!locale) return Promise.reject("Missing required fields");
  return new Promise<GenreList>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/genre/movie/list?" +
          new URLSearchParams({
            locale,
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as GenreListData;
      if ("genres" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetWatchProvidersForMovieParams = {
  movie_id: number;
};

export const getWatchProvidersForMovie = async ({ movie_id }: GetWatchProvidersForMovieParams) => {
  if (!movie_id) return Promise.reject("Missing required fields");
  return new Promise<MovieWatchProvidersDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/watch/providers?" +
          new URLSearchParams({
            movie_id: movie_id.toString(),
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as MovieWatchProvidersDetails;
      if ("results" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetRecommendationsForMovieParams = {
  movie_id: number;
  locale: GeneralSliceState["locale"];
};

export const getRecommendationsForMovie = async ({ movie_id, locale }: GetRecommendationsForMovieParams) => {
  if (!movie_id || !locale) return Promise.reject("Missing required fields");
  return new Promise<MovieRecommendationsDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/recommendations?" +
          new URLSearchParams({
            movie_id: movie_id.toString(),
            locale,
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as MovieRecommendationsDetails;
      if ("results" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetRecommendationsForTvParams = {
  tv_id: number;
  locale: GeneralSliceState["locale"];
};

export const getRecommendationsForTv = async ({ tv_id, locale }: GetRecommendationsForTvParams) => {
  if (!tv_id || !locale) return Promise.reject("Missing required fields");
  return new Promise<TvRecommendationsDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/recommendations?" +
          new URLSearchParams({
            tv_id: tv_id.toString(),
            locale,
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TvRecommendationsDetails;
      if ("results" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetCreditsForMovieParams = {
  movie_id: number;
  locale: GeneralSliceState["locale"];
};

export const getCreditsForMovie = async ({ movie_id, locale }: GetCreditsForMovieParams) => {
  if (!movie_id || !locale) return Promise.reject("Missing required fields");

  return new Promise<MovieCreditsDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/credits?" + new URLSearchParams({ movie_id: movie_id.toString(), locale: locale as string })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as MovieCreditsData;
      if ("cast" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

type GetForMovieParams = {
  movie_id: number;
  session_id: string | null;
};

export const getAccountStatesForMovie = async ({ movie_id, session_id }: GetForMovieParams) => {
  if (!movie_id || !session_id) return Promise.reject("Missing required fields");
  return new Promise<MovieAccountStatesDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/movie/account_states?" +
          new URLSearchParams({
            session_id,
            movie_id: movie_id.toString(),
          })
      );

      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as MovieAccountStatesData;
      if ("id" in json) resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export type AddMediaToFavoritesParams = {
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
  account_id: number;
  session_id: string;
};

export const addMediaToFavorites = async ({
  account_id,
  favorite,
  media_id,
  media_type,
  session_id,
}: AddMediaToFavoritesParams) => {
  if (!media_id || !session_id || !account_id || favorite === undefined || !media_type)
    return Promise.reject("Missing required fields");

  return new Promise<AccountFavoritesData>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/favorite?" +
          new URLSearchParams({
            account_id: account_id.toString(),
            session_id,
          }),
        {
          method: "POST",
          body: JSON.stringify({
            media_type,
            favorite,
            media_id,
          }),
        }
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as AccountFavoritesData;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export type AddMediaToWatchlistParams = {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
  account_id: number;
  session_id: string | null;
};

export const addMediaToWatchlist = async ({
  account_id,
  watchlist,
  media_id,
  media_type,
  session_id,
}: AddMediaToWatchlistParams) => {
  if (!media_id || !session_id || !account_id || watchlist === undefined || !media_type)
    return Promise.reject("Missing required fields");

  return new Promise<AccountWatchlistData>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/watchlist?" +
          new URLSearchParams({
            account_id: account_id.toString(),
            session_id,
          }),
        {
          method: "POST",
          body: JSON.stringify({
            media_type,
            watchlist,
            media_id,
          }),
        }
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as AccountWatchlistData;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export type GetMoviesWatchlistParams = {
  session_id: string | null;
  account_id: number;
  locale: GeneralSliceState["locale"];
  sort_by: "created_at.desc" | "created_at.asc";
  page?: number;
};

export const getMoviesWatchlist = ({ session_id, account_id, locale, sort_by, page }: GetMoviesWatchlistParams) => {
  if (!session_id) return Promise.reject(new Error("session_id not specified."));

  return new Promise<AccountMoviesWatchlistDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/watchlist?" +
          new URLSearchParams({
            session_id,
            account_id: account_id.toString(),
            page: page?.toString() || "",
            locale: locale as string,
            sort_by,
            mediaType: "movies",
          })
      );
      if (!result.ok) return reject({ status: result.status });

      const json = (await result.json()) as AccountMoviesWatchlistDetails;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export type GetTvWatchlistParams = {
  session_id: string | null;
  page?: number;
  account_id: number;
  locale: GeneralSliceState["locale"];
  sort_by: "created_at.desc" | "created_at.asc";
};

export const getTvWatchlist = ({ account_id, locale, session_id, sort_by, page }: GetTvWatchlistParams) => {
  if (!session_id) return Promise.reject(new Error("session_id not specified."));

  return new Promise<AccountTvWatchlistDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/watchlist?" +
          new URLSearchParams({
            session_id,
            account_id: account_id.toString(),
            page: page?.toString() || "",
            locale: locale as string,
            sort_by,
            mediaType: "tv",
          })
      );
      if (!result.ok) return reject({ status: result.status });

      const json = (await result.json()) as AccountTvWatchlistDetails;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export type GetFavoriteMoviesParams = {
  session_id: string | null;
  account_id: number;
  locale: GeneralSliceState["locale"];
  sort_by: "created_at.desc" | "created_at.asc";
  page?: number;
};

export const getFavoriteMovies = ({ session_id, account_id, locale, sort_by, page }: GetFavoriteMoviesParams) => {
  if (!session_id) return Promise.reject(new Error("session_id not specified."));

  return new Promise<AccountMoviesFavoritesDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/favorite?" +
          new URLSearchParams({
            session_id,
            account_id: account_id.toString(),
            page: page?.toString() || "",
            locale: locale as string,
            sort_by,
            mediaType: "movies",
          })
      );
      if (!result.ok) return reject({ status: result.status });

      const json = (await result.json()) as AccountMoviesFavoritesDetails;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export type GetFavoriteTvParams = {
  session_id: string | null;
  page?: number;
  account_id: number;
  locale: GeneralSliceState["locale"];
  sort_by: "created_at.desc" | "created_at.asc";
};

export const getFavoriteTv = ({ account_id, locale, session_id, sort_by, page }: GetFavoriteTvParams) => {
  if (!session_id) return Promise.reject(new Error("session_id not specified."));

  return new Promise<AccountTvFavoritesDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/account/favorite?" +
          new URLSearchParams({
            session_id,
            account_id: account_id.toString(),
            page: page?.toString() || "",
            locale: locale as string,
            sort_by,
            mediaType: "tv",
          })
      );
      if (!result.ok) return reject({ status: result.status });

      const json = (await result.json()) as AccountTvFavoritesDetails;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

type GetTvDetailsParams = {
  tv_id: number;
  language: GeneralSliceState["locale"];
};

export const getTvDetails = ({ tv_id, language }: GetTvDetailsParams) => {
  if (!language) return Promise.reject("Missing required fields");

  return new Promise<TvDetails>(async (resolve, reject) => {
    try {
      const result = await fetch(
        `/api/tv/${tv_id}?` +
          new URLSearchParams({
            language,
          })
      );
      if (!result.ok) reject({ status: result.status });

      const json = (await result.json()) as TvDetails;
      resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
