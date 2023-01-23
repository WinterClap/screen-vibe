import type { MovieWatchProvidersDetails } from "./../../../../../pages/api/movie/watch/providers";
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
    {}
  );
};
