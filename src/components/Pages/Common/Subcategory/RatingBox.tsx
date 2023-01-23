import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { MOVIE_ACCOUNT_STATES_BASE_KEY } from "../../../../queryKeys";
import { setShouldShowLoginModal } from "../../../../slices/generalSlice";
import { setToastData } from "../../../../slices/toastMessageSlice";
import { RootState } from "../../../../store";
import { getSessionIdFromLocalStorage } from "../../../../utils";
import { RateMovieParams, rateMovie, getAccountStatesForMovie } from "../../../../utils/api/movie";
import { Button, Col, Row } from "../../../common";
import Rating from "./Rating";
import RatingBoxSkeleton from "./RatingBoxSkeleton";
import {
  AverageRatingContainer,
  DynamicVoteBox,
  RatingBoxContainer,
  RatingBoxDimmedText,
  RatingBoxInnerContainer,
  RatingBoxSubheader,
  SubcategoryMainHeader,
} from "./styles";

type Props = {
  movieId: number;
  movieTitle: string;
  voteAvg: number;
  voteCount: number;
};

const RatingBox = ({ movieId, movieTitle, voteAvg, voteCount }: Props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const session_id = getSessionIdFromLocalStorage();

  const [shouldShowRatingComponent, setShouldShowRatingComponent] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAccountStatesForMovie({ movie_id: movieId, session_id } as { movie_id: number; session_id: string }),
    staleTime: Infinity,
    queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, movieId],
    enabled: isLoggedIn,
  });

  const mutationRating = useMutation({
    mutationFn: (payload: RateMovieParams) => rateMovie(payload),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, movieId],
        });
      }, 500);
      dispatch(
        setToastData({
          content: `Succesfuly rated ${movieTitle}!`,
          icon: "success",
        })
      );
      setShouldShowRatingComponent(false);
    },
  });

  const onRateButtonClick = (rateValue: number) => {
    if (!isLoggedIn || session_id === null) {
      dispatch(setShouldShowLoginModal(true));
      return;
    }

    mutationRating.mutate({ movie_id: movieId, session_id, value: rateValue });
  };

  const onDynamicButtonClick = () => {
    setShouldShowRatingComponent(true);
  };

  console.log(data);

  return (
    <RatingBoxContainer>
      <SubcategoryMainHeader>Rating</SubcategoryMainHeader>
      {isLoading || isError ? (
        <RatingBoxSkeleton />
      ) : (
        <RatingBoxInnerContainer layout>
          <Row $gap="5px" $justifyContent="space-around" $alignItems="flex-start" w="100%" mw="450px">
            <Col>
              <RatingBoxSubheader>Vote average</RatingBoxSubheader>
              <AverageRatingContainer>{voteAvg}/10</AverageRatingContainer>
              <RatingBoxDimmedText>Votes: {voteCount}</RatingBoxDimmedText>
            </Col>
            {data && typeof data.rated !== "boolean" && (
              <DynamicVoteBox initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <RatingBoxSubheader>Your rate</RatingBoxSubheader>
                <AverageRatingContainer>{data.rated.value}/10</AverageRatingContainer>
              </DynamicVoteBox>
            )}
          </Row>
          <Col h="100%" $alignSelf="center">
            <AnimatePresence mode="wait">
              {shouldShowRatingComponent ? (
                <Rating sendingRating={mutationRating.isLoading} onRateButtonClick={onRateButtonClick} />
              ) : (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  <Button
                    title="Rate this movie"
                    onClick={onDynamicButtonClick}
                    key="show-rating-component-button"
                    $secondary
                  >
                    Rate this movie
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
        </RatingBoxInnerContainer>
      )}
    </RatingBoxContainer>
  );
};

export default RatingBox;
