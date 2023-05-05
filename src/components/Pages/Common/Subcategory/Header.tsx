import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOpenInNew, MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { setShouldShowLoginModal } from "../../../../slices/generalSlice";
import { getSessionIdFromLocalStorage } from "../../../../utils";
import { IconContainer, Row, StyledLink } from "../../../common";
import { HeaderContainer } from "./styles";
import {
  addMediaToFavorites,
  AddMediaToFavoritesParams,
  addMediaToWatchlist,
  AddMediaToWatchlistParams,
  getAccountStatesForMovie,
} from "../../../../utils/api/movie";
import {
  MOVIES_FAVORITES_PER_PAGE,
  MOVIES_WATCHLIST_PER_PAGE,
  MOVIE_ACCOUNT_STATES_BASE_KEY,
  TV_ACCOUNT_STATES_BASE_KEY,
  TV_FAVORITES_PER_PAGE,
  TV_WATCHLIST_PER_PAGE,
} from "../../../../queryKeys";
import CircularLoader from "../../../Loaders/CircularLoader";
import type { RootState } from "../../../../store";
import { setToastData } from "../../../../slices/toastMessageSlice";
import { getAccountStatesForTv } from "../../../../utils/api/tv";

type Props = {
  type: "categoryItem" | "item" | "card";
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
};

const Header = ({ type, mediaId, mediaTitle, mediaType }: Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const session_id = getSessionIdFromLocalStorage();
  const dispatch = useDispatch();
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAccountStatesForMovie({ movie_id: mediaId, session_id }),
    onSuccess: (data) => {
      data && setIsFavorite(data.favorite);
      data && setIsWatchlisted(data.watchlist);
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
      data && setIsFavorite(data.favorite);
      data && setIsWatchlisted(data.watchlist);
    },
    staleTime: Infinity,
    queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
    enabled: isLoggedIn && mediaType === "tv",
  });
  const [isFavorite, setIsFavorite] = React.useState<boolean>(
    mediaType === "movie" ? data?.favorite || false : dataTv?.favorite || false
  );
  const [isWatchlisted, setIsWatchlisted] = React.useState<boolean>(
    mediaType === "movie" ? data?.watchlist || false : dataTv?.watchlist || false
  );

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

    mutationFavorite.mutate({
      account_id: accountDetails?.id as number,
      favorite: !isFavorite,
      media_id: mediaId,
      media_type: mediaType,
      session_id,
    });
    e.stopPropagation();
  };

  const onWatchLaterClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isLoggedIn || session_id === null) {
      dispatch(setShouldShowLoginModal(true));
      e.stopPropagation();
      return;
    }

    mutationWatchlist.mutate({
      account_id: accountDetails?.id as number,
      watchlist: !isWatchlisted,
      media_id: mediaId,
      media_type: mediaType,
      session_id,
    });
    e.stopPropagation();
  };

  return (
    <HeaderContainer className="header-container" $type={type}>
      <Row cursor="pointer" $justifyContent={type === "item" ? "flex-end" : "space-around"}>
        <StyledLink href={`/category/movies/${(mediaId && mediaId) || ""}`}>
          <IconContainer
            title="Open in full view"
            color="white"
            display={type === "item" ? "none" : "flex"}
            cursor="pointer"
            role="button"
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.25 }}
          >
            <MdOpenInNew size={type === "categoryItem" ? 14 : 29} />
          </IconContainer>
        </StyledLink>
        <Row $gap="5px">
          {(((!isLoading && !isError) || (!isLoadingTv && !isErrorTv)) && (data || dataTv)) ||
          session_id === null ||
          !isLoggedIn ? (
            <>
              <IconContainer
                onClick={onWatchLaterClick}
                cursor="pointer"
                role="button"
                m={type === "card" ? "0 20px 0 0" : "0"}
                whileTap={{ scale: 1 }}
                color={theme.white}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{ scale: 1.2 }}
                title={isWatchlisted ? "Remove from your watchlist" : "Add to your watchlist"}
              >
                {isWatchlisted ? (
                  <MdWatchLater size={type === "card" ? 32 : type === "categoryItem" ? 16 : 26} />
                ) : (
                  <MdOutlineWatchLater size={type === "card" ? 32 : type === "categoryItem" ? 16 : 26} />
                )}
              </IconContainer>
              <IconContainer
                onClick={onFavoriteClick}
                cursor="pointer"
                role="button"
                whileTap={{ scale: 1 }}
                animate={{ color: isFavorite ? theme.danger : theme.white }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{ scale: 1.2 }}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <IoMdHeart size={type === "card" ? 32 : type === "categoryItem" ? 16 : 26} />
                ) : (
                  <IoMdHeartEmpty size={type === "card" ? 32 : type === "categoryItem" ? 16 : 26} />
                )}
              </IconContainer>
            </>
          ) : (
            <CircularLoader color={theme.white} />
          )}
        </Row>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
