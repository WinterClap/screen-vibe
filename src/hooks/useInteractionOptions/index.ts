import React from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getSessionIdFromLocalStorage } from "../../utils";
import {
  MOVIE_ACCOUNT_STATES_BASE_KEY,
  TV_ACCOUNT_STATES_BASE_KEY,
  MOVIES_FAVORITES_PER_PAGE,
  TV_FAVORITES_PER_PAGE,
  MOVIES_WATCHLIST_PER_PAGE,
  TV_WATCHLIST_PER_PAGE,
} from "../../queryKeys";
import { setShouldShowLoginModal } from "../../slices/generalSlice";
import { setToastData } from "../../slices/toastMessageSlice";
import type { RootState } from "../../store";
import {
  getAccountStatesForMovie,
  AddMediaToFavoritesParams,
  addMediaToFavorites,
  AddMediaToWatchlistParams,
  addMediaToWatchlist,
} from "../../utils/api/movie";
import { getAccountStatesForTv } from "../../utils/api/tv";

type HookParams = {
  mediaId: number;
  mediaType: "movie" | "tv" | "person";
  mediaTitle: string;
};

const useInteractionOptions = ({ mediaId, mediaType, mediaTitle }: HookParams) => {
  const queryClient = useQueryClient();
  const session_id = getSessionIdFromLocalStorage();
  const dispatch = useDispatch();
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAccountStatesForMovie({ movie_id: mediaId, session_id }),
    onSuccess: (data) => {
      // data && setIsFavorite(data.favorite);
      // data && setIsWatchlisted(data.watchlist);
    },
    staleTime: Infinity,
    queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId],
    enabled: isLoggedIn && mediaType === "movie",
  });
  const {
    data: dataTv,
    isLoading: isLoadingTv,
    isError: isErrorTv,
  } = useQuery({
    queryFn: () => getAccountStatesForTv({ tv_id: mediaId, session_id }),
    onSuccess: (data) => {
      // console.log("GET ACCOUNT STATES FOR TV SUCCESS");
      // data && setIsFavorite(data.favorite);
      // data && setIsWatchlisted(data.watchlist);
    },
    staleTime: Infinity,
    queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
    enabled: isLoggedIn && mediaType === "tv",
  });
  // const [isFavorite, setIsFavorite] = React.useState<boolean>(
  //   mediaType === "movie" ? data?.favorite || false : dataTv?.favorite || false
  // );
  // const [isWatchlisted, setIsWatchlisted] = React.useState<boolean>(
  //   mediaType === "movie" ? data?.watchlist || false : dataTv?.watchlist || false
  // );
  const isFavorite = mediaType === "movie" ? data?.favorite || false : dataTv?.favorite;
  const isWatchlisted = mediaType === "movie" ? data?.watchlist || false : dataTv?.watchlist;

  React.useEffect(() => {}, [data?.favorite, data?.watchlist, dataTv?.favorite, dataTv?.watchlist]);

  const mutationFavorite = useMutation({
    mutationFn: (payload: AddMediaToFavoritesParams) => addMediaToFavorites(payload),
    onSuccess: () => {
      dispatch(
        setToastData({
          content: `${!isFavorite ? "Added" : "Removed"} ${mediaTitle} ${!isFavorite ? "to" : "from"} favorites!`,
          icon: "success",
        })
      );
      if (mediaType === "movie") {
        queryClient.invalidateQueries({
          queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId],
        });
        queryClient.invalidateQueries({
          queryKey: [MOVIES_FAVORITES_PER_PAGE, 1],
        });
        return;
      }
      queryClient.invalidateQueries({
        queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
      });
      queryClient.invalidateQueries({
        queryKey: [TV_FAVORITES_PER_PAGE, 1],
      });
    },
  });

  const mutationWatchlist = useMutation({
    mutationFn: (payload: AddMediaToWatchlistParams) => addMediaToWatchlist(payload),
    onSuccess: () => {
      dispatch(
        setToastData({
          content: `${!isWatchlisted ? "Added" : "Removed"} ${mediaTitle} ${
            !isWatchlisted ? "to" : "from"
          } your watchlist!`,
          icon: "success",
        })
      );
      if (mediaType === "movie") {
        queryClient.invalidateQueries({
          queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId],
        });
        queryClient.invalidateQueries({
          queryKey: [MOVIES_WATCHLIST_PER_PAGE, 1],
        });
        return;
      }
      queryClient.invalidateQueries({
        queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
      });
      queryClient.invalidateQueries({
        queryKey: [TV_WATCHLIST_PER_PAGE, 1],
      });
    },
  });

  const onFavoriteClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isLoggedIn || session_id === null) {
      dispatch(setShouldShowLoginModal(true));
      e.stopPropagation();
      return;
    }

    if (mediaType !== "person") {
      mutationFavorite.mutate({
        account_id: accountDetails?.id as number,
        favorite: !isFavorite,
        media_id: mediaId,
        media_type: mediaType,
        session_id,
      });
    }
    e.stopPropagation();
  };

  const onWatchLaterClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isLoggedIn || session_id === null) {
      dispatch(setShouldShowLoginModal(true));
      e.stopPropagation();
      return;
    }

    if (mediaType !== "person") {
      mutationWatchlist.mutate({
        account_id: accountDetails?.id as number,
        watchlist: !isWatchlisted,
        media_id: mediaId,
        media_type: mediaType,
        session_id,
      });
    }
    e.stopPropagation();
  };

  return { isWatchlisted, isFavorite, isLoading, isLoadingTv, isError, isErrorTv, onWatchLaterClick, onFavoriteClick };
};

export default useInteractionOptions;
