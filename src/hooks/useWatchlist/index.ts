import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  MOVIES_WATCHLIST_PER_PAGE,
  MOVIE_ACCOUNT_STATES_BASE_KEY,
  TV_ACCOUNT_STATES_BASE_KEY,
  TV_WATCHLIST_PER_PAGE,
} from "../../queryKeys";
import { getSessionIdFromLocalStorage } from "../../utils";
import { addMediaToWatchlist, getMoviesWatchlist, getTvWatchlist } from "../../utils/api/movie";

type Props = {
  page?: number;
  mediaType: "movies" | "tv";
  locale: string;
  account_id: number;
  sort_by: "created_at.desc" | "created_at.asc";
};

const useWatchlist = ({ account_id, mediaType, locale, page = 1, sort_by }: Props) => {
  const queryClient = useQueryClient();
  const session_id = getSessionIdFromLocalStorage();

  const {
    data: moviesData,
    isError: isErrorMovies,
    isLoading: isLoadingMovies,
  } = useQuery({
    queryKey: [MOVIES_WATCHLIST_PER_PAGE, page],
    queryFn: () => getMoviesWatchlist({ account_id, locale, session_id, sort_by, page }),
    staleTime: Infinity,
    enabled: !!locale && account_id !== 0 && mediaType === "movies",
  });

  const {
    data: tvData,
    isError: isErrorTv,
    isLoading: isLoadingTv,
  } = useQuery({
    queryKey: [TV_WATCHLIST_PER_PAGE, page],
    queryFn: () => getTvWatchlist({ account_id, locale, session_id, sort_by, page }),
    staleTime: Infinity,
    enabled: !!locale && account_id !== 0 && mediaType === "tv",
  });

  const removeFromWatchlist = async ({ mediaId }: { mediaId: number }) => {
    await addMediaToWatchlist({
      account_id,
      media_id: mediaId,
      media_type: mediaType === "movies" ? "movie" : "tv",
      session_id,
      watchlist: false,
    });
    if (mediaType === "movies") {
      queryClient.invalidateQueries({ queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId] });
      queryClient.invalidateQueries({ queryKey: [MOVIES_WATCHLIST_PER_PAGE, page] });
      return;
    }
    queryClient.invalidateQueries({ queryKey: [TV_WATCHLIST_PER_PAGE, page] });
    queryClient.invalidateQueries({ queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId] });
  };

  return { moviesData, isErrorMovies, isLoadingMovies, tvData, isErrorTv, isLoadingTv, removeFromWatchlist };
};

export default useWatchlist;
