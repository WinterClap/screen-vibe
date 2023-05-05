import type { CommonInfo, MovieWatchProvidersDetails } from "./../../../../../pages/api/movie/watch/providers";
import type { TvWatchProvidersDetails } from "../../../../../pages/api/tv/watch/providers";
import type { GenreList } from "../../../../../pages/api/genre/movie/list";
import { countries } from "../../../../constants/countries";

export const getGenresFromGlobalGenres = (ids: number[], genres: GenreList["genres"]) => {
  return genres.filter((genre) => ids.includes(genre.id));
};

export const getResultFromGlobalProviders = (
  country: typeof countries[number]["code"],
  providersResults: MovieWatchProvidersDetails["results"]
) => {
  return (
    providersResults[country as keyof MovieWatchProvidersDetails["results"]] ||
    providersResults["US" as keyof MovieWatchProvidersDetails["results"]] ||
    null
  );
};
export const getResultFromGlobalTvProviders = (
  country: typeof countries[number]["code"],
  providersResults: TvWatchProvidersDetails["results"]
) => {
  return (
    providersResults[country as keyof TvWatchProvidersDetails["results"]] ||
    providersResults["US" as keyof TvWatchProvidersDetails["results"]] ||
    null
  );
};
