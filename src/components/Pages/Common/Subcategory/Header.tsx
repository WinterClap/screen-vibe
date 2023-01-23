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
import { MOVIE_ACCOUNT_STATES_BASE_KEY } from "../../../../queryKeys";
import CircularLoader from "../../../Loaders/CircularLoader";
import type { RootState } from "../../../../store";
import { setToastData } from "../../../../slices/toastMessageSlice";

type Props = {
  type: "item" | "card";
  movieId: number;
  movieTitle: string;
};

const Header = ({ type, movieId, movieTitle }: Props) => {
  const theme = useTheme();

  const queryClient = useQueryClient();
  const session_id = getSessionIdFromLocalStorage();
  const dispatch = useDispatch();
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);
  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAccountStatesForMovie({ movie_id: movieId, session_id } as { movie_id: number; session_id: string }),
    onSuccess: (data) => {
      data && setIsFavorite(data.favorite);
      data && setIsWatchlisted(data.watchlist);
    },
    staleTime: Infinity,
    queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, movieId],
    enabled: isLoggedIn,
  });
  const [isFavorite, setIsFavorite] = React.useState<boolean>(data?.favorite || false);
  const [isWatchlisted, setIsWatchlisted] = React.useState<boolean>(data?.watchlist || false);

  const mutationFavorite = useMutation({
    mutationFn: (payload: AddMediaToFavoritesParams) => addMediaToFavorites(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, movieId],
      });
      dispatch(
        setToastData({
          content: `${!isFavorite ? "Added" : "Removed"} ${movieTitle} ${!isFavorite ? "to" : "from"} favorites!`,
          icon: "success",
        })
      );
    },
  });

  const mutationWatchlist = useMutation({
    mutationFn: (payload: AddMediaToWatchlistParams) => addMediaToWatchlist(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, movieId],
      });
      dispatch(
        setToastData({
          content: `${!isWatchlisted ? "Added" : "Removed"} ${movieTitle} ${
            !isWatchlisted ? "to" : "from"
          } your watchlist!`,
          icon: "success",
        })
      );
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
      media_id: movieId,
      media_type: "movie",
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
      media_id: movieId,
      media_type: "movie",
      session_id,
    });
    e.stopPropagation();
  };

  return (
    <HeaderContainer className="header-container" $type={type}>
      <Row cursor="pointer" $justifyContent={type === "item" ? "flex-end" : "space-around"}>
        <StyledLink href={`/category/movies/${(movieId && movieId) || ""}`}>
          <IconContainer
            title="Open in full view"
            color="white"
            $zIndex={1000}
            display={type === "item" ? "none" : "flex"}
            cursor="pointer"
            role="button"
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.25 }}
          >
            <MdOpenInNew size={32} />
          </IconContainer>
        </StyledLink>
        <Row $gap="5px">
          {(!isLoading && !isError) || session_id === null || !isLoggedIn ? (
            <>
              <IconContainer
                onClick={onWatchLaterClick}
                cursor="pointer"
                role="button"
                m={type === "card" ? "0 20px 0 0" : "0"}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{ scale: 1.2 }}
                title={isWatchlisted ? "Remove from your watchlist" : "Add to your watchlist"}
              >
                {isWatchlisted ? (
                  <MdWatchLater size={type === "card" ? 32 : 26} />
                ) : (
                  <MdOutlineWatchLater size={type === "card" ? 32 : 26} />
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
                  <IoMdHeart size={type === "card" ? 32 : 26} />
                ) : (
                  <IoMdHeartEmpty size={type === "card" ? 32 : 26} />
                )}
              </IconContainer>
            </>
          ) : (
            <CircularLoader />
          )}
        </Row>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
