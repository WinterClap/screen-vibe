import { getCountryAndLanguageFromLocale } from "../../../components/SplashScreen/utils";
import type { GeneralSliceState } from "../../../slices/generalSlice";
import type { PopularMovieData } from "../../../../pages/api/movie/popular";
import type { GenreListData } from "../../../../pages/api/genre/movie/list";
import type { MovieWatchProvidersData } from "../../../../pages/api/movie/watch/providers";
import type { MovieCreditsData } from "../../../../pages/api/movie/credits";
import type { MovieAccountStatesData } from "../../../../pages/api/movie/account_states";
import type { AccountFavoriteData } from "../../../../pages/api/account/favorite";
import type { MovieRatingData } from "../../../../pages/api/movie/rating";

type GetPopularMoviesParams = {
  locale: GeneralSliceState["locale"];
  page?: number;
};

export const getPopularMovies = async ({ locale, page = 1 }: GetPopularMoviesParams) => {
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

type GetGenreMovieListParams = {
  locale: GeneralSliceState["locale"];
};

export const getGenreMovieList = async ({ locale }: GetGenreMovieListParams) => {
  if (!locale) return;
  try {
    const result = await fetch(
      "/api/genre/movie/list?" +
        new URLSearchParams({
          locale,
        })
    );
    const json = (await result.json()) as GenreListData;
    if ("genres" in json) {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

type GetWatchProvidersForMovieParams = {
  movie_id: number;
};

export const getWatchProvidersForMovie = async ({ movie_id }: GetWatchProvidersForMovieParams) => {
  if (!movie_id) return;
  try {
    const result = await fetch(
      "/api/movie/watch/providers?" +
        new URLSearchParams({
          movie_id: movie_id.toString(),
        })
    );
    const json = (await result.json()) as MovieWatchProvidersData;
    if ("results" in json) {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

type GetCreditsForMovieParams = {
  movie_id: number;
  locale: GeneralSliceState["locale"];
};

export const getCreditsForMovie = async ({ movie_id, locale }: GetCreditsForMovieParams) => {
  if (!movie_id || !locale) return;
  try {
    const result = await fetch(
      "/api/movie/credits?" + new URLSearchParams({ movie_id: movie_id.toString(), locale: locale as string })
    );
    const json = (await result.json()) as MovieCreditsData;
    if ("cast" in json) {
      return json;
    }
  } catch (error) {
    console.error(error);
  }
};

type GetAccountStatesForMovieParams = {
  movie_id: number;
  session_id: string;
};

export const getAccountStatesForMovie = async ({ movie_id, session_id }: GetAccountStatesForMovieParams) => {
  if (!movie_id || !session_id) return;
  try {
    const result = await fetch(
      "/api/movie/account_states?" +
        new URLSearchParams({
          session_id,
          movie_id: movie_id.toString(),
        })
    );
    const json = (await result.json()) as MovieAccountStatesData;
    if ("id" in json) return json;
  } catch (error) {
    console.error(error);
  }
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
  if (!media_id || !session_id || !account_id || favorite === undefined || !media_type) return;
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
    return (await result.json()) as AccountFavoriteData;
  } catch (error) {
    console.log(error);
  }
};

export type AddMediaToWatchlistParams = {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
  account_id: number;
  session_id: string;
};

export const addMediaToWatchlist = async ({
  account_id,
  watchlist,
  media_id,
  media_type,
  session_id,
}: AddMediaToWatchlistParams) => {
  if (!media_id || !session_id || !account_id || watchlist === undefined || !media_type) return;
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

    return (await result.json()) as AccountFavoriteData;
  } catch (error) {
    console.log(error);
  }
};

export type RateMovieParams = {
  movie_id: number;
  session_id: string;
  value: number;
};

export const rateMovie = async ({ movie_id, session_id, value }: RateMovieParams) => {
  if (!movie_id || !session_id || !value) return;
  try {
    const result = await fetch(
      "/api/movie/rating?" +
        new URLSearchParams({
          movie_id: movie_id.toString(),
          session_id,
        }),
      {
        method: "POST",
        body: JSON.stringify({
          value,
        }),
      }
    );

    return (await result.json()) as MovieRatingData;
  } catch (error) {
    console.log(error);
  }
};
