import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { MOVIE_ACCOUNT_STATES_BASE_KEY, TV_ACCOUNT_STATES_BASE_KEY } from "../../../../queryKeys";
import { setShouldShowLoginModal } from "../../../../slices/generalSlice";
import { setToastData } from "../../../../slices/toastMessageSlice";
import { RootState } from "../../../../store";
import { getSessionIdFromLocalStorage } from "../../../../utils";
import { getAccountStatesForMovie } from "../../../../utils/api/movie";
import { getAccountStatesForTv } from "../../../../utils/api/tv";
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
import { RateMediaParams, rateMedia } from "../../../../utils/api";

type Props = {
  mediaId: number;
  mediaTitle: string;
  voteAvg: number;
  voteCount: number;
  mediaType: "movie" | "tv";
};

const RatingBox = ({ mediaId, mediaTitle, mediaType, voteAvg, voteCount }: Props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const session_id = getSessionIdFromLocalStorage();

  const [shouldShowRatingComponent, setShouldShowRatingComponent] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAccountStatesForMovie({ movie_id: mediaId, session_id }),
    queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId],
    enabled: isLoggedIn && mediaType === "movie",
    staleTime: Infinity,
  });
  const {
    data: dataTv,
    isLoading: isLoadingTv,
    isError: isErrorTv,
  } = useQuery({
    queryFn: () => getAccountStatesForTv({ tv_id: mediaId, session_id }),
    queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
    enabled: isLoggedIn && mediaType === "tv",
    staleTime: Infinity,
  });

  const mutationRating = useMutation({
    mutationFn: (payload: RateMediaParams) => rateMedia(payload),
    onSuccess: () => {
      setTimeout(() => {
        if (mediaType === "movie") {
          queryClient.invalidateQueries({
            queryKey: [MOVIE_ACCOUNT_STATES_BASE_KEY, mediaId],
          });
          return;
        }
        queryClient.invalidateQueries({
          queryKey: [TV_ACCOUNT_STATES_BASE_KEY, mediaId],
        });
      }, 1000);
      dispatch(
        setToastData({
          content: `Succesfuly rated ${mediaTitle}!`,
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

    mutationRating.mutate({ mediaId: mediaId, session_id, value: rateValue, mediaType });
  };

  const onDynamicButtonClick = () => {
    setShouldShowRatingComponent(true);
  };

  console.log("RatingBoxData: ", data);
  console.log("RatingBoxMediaType ", mediaType);

  return (
    <RatingBoxContainer>
      <SubcategoryMainHeader>Rating</SubcategoryMainHeader>
      {isLoading || isLoadingTv || isError || isErrorTv ? (
        <RatingBoxSkeleton />
      ) : (
        <RatingBoxInnerContainer layout>
          <Row $gap="5px" $justifyContent="space-around" $alignItems="flex-start" w="100%" mw="450px">
            <Col>
              <RatingBoxSubheader>Vote average</RatingBoxSubheader>
              <AverageRatingContainer>{voteAvg}/10</AverageRatingContainer>
              <RatingBoxDimmedText>Votes: {voteCount}</RatingBoxDimmedText>
            </Col>
            {mediaType === "movie" && data && typeof data.rated !== "boolean" ? (
              <DynamicVoteBox initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <RatingBoxSubheader>Your rate</RatingBoxSubheader>
                <AverageRatingContainer>{data.rated.value}/10</AverageRatingContainer>
              </DynamicVoteBox>
            ) : (
              mediaType === "tv" &&
              dataTv &&
              typeof dataTv.rated !== "boolean" && (
                <DynamicVoteBox initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <RatingBoxSubheader>Your rate</RatingBoxSubheader>
                  <AverageRatingContainer>{dataTv.rated.value}/10</AverageRatingContainer>
                </DynamicVoteBox>
              )
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
                    {`Rate this ${mediaType ? "movie" : "TV show"}`}
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
