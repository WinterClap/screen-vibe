import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { FaQuestion } from "react-icons/fa";
import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import MediaSkeleton from "../../MediaSkeleton";
import useMovieInfo from "../../../../../../hooks/useMovieInfo";
import type { RootState } from "../../../../../../store";
import { setToastData } from "../../../../../../slices/toastMessageSlice";
import MediaError from "../../MediaError";
import {
  BackdropImageContainer,
  InformationContainer,
  MediaContent,
  MediaContentHeader,
  MediaContentText,
  MediaTitle,
  PosterImageContainer,
} from "../../styles";
import { IMAGE_PIC_BASE_URL_W1280, IMAGE_PIC_BASE_URL_W300 } from "../../../../../../utils/api/constants";
import GenresTagger from "../../GenresTagger";
import DescriptionBox from "../../DescriptionBox";
import { Col, IconContainer, Row } from "../../../../../common";
import ProvidersBox from "../../../Subcategory/ProvidersBox";
import { getResultFromGlobalProviders } from "../../../Subcategory/utils";
import { getCountryAndLanguageFromLocale } from "../../../../../SplashScreen/utils";
import {
  MOVIES_RECOMMENDATIONS_PER_PAGE,
  MOVIE_CREDITS_BASE_KEY,
  MOVIE_WATCH_PROVIDERS_BASE_KEY,
} from "../../../../../../queryKeys";
import {
  getCreditsForMovie,
  getRecommendationsForMovie,
  getWatchProvidersForMovie,
} from "../../../../../../utils/api/movie";
import { MovieWatchProvidersDetails } from "../../../../../../../pages/api/movie/watch/providers";
import CastBox from "../../../Subcategory/CastBox";
import RatingBox from "../../../Subcategory/RatingBox";
import Category from "../../../Category";
import useInteractionOptions from "../../../../../../hooks/useInteractionOptions";
import Head from "next/head";

type Props = {
  id: number;
};

const MovieContent = ({ id }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.general.locale);
  const { movieDetailsData, movieDetailsIsError, movieDetailsIsLoading } = useMovieInfo({
    language: locale,
    movie_id: id,
  });
  const { data: watchProvidersData, isLoading: isLoadingWatchProvidersData } = useQuery({
    queryKey: [MOVIE_WATCH_PROVIDERS_BASE_KEY, `${id}`],
    queryFn: () => getWatchProvidersForMovie({ movie_id: id }),
    enabled: Boolean(id),
    staleTime: Infinity,
  });
  const { data: creditsData, isLoading: isLoadingCreditsData } = useQuery({
    queryKey: [MOVIE_CREDITS_BASE_KEY, `${id}`],
    queryFn: () => getCreditsForMovie({ movie_id: id, locale }),
    enabled: !!locale,
    staleTime: Infinity,
  });
  const { data: movieRecommendationsData, isLoading: isLoadingMovieRecommedations } = useQuery({
    queryKey: [MOVIES_RECOMMENDATIONS_PER_PAGE, `${id}`, 1],
    queryFn: () => getRecommendationsForMovie({ movie_id: id, locale }),
    enabled: !!locale,
    staleTime: Infinity,
  });
  const { isWatchlisted, isFavorite, onFavoriteClick, onWatchLaterClick } = useInteractionOptions({
    mediaId: id,
    mediaType: "movie",
    mediaTitle: movieDetailsData?.title || "",
  });
  const regionInfo = getCountryAndLanguageFromLocale(locale);

  console.log("movieDetailsData: ", movieDetailsData);

  React.useEffect(() => {
    if (movieDetailsIsError) {
      dispatch(setToastData({ content: "Error fetching movie info", icon: "danger" }));
    }
  });

  if (movieDetailsIsLoading) {
    return <MediaSkeleton />;
  }

  if (movieDetailsIsError) {
    return <MediaError mediaType="movie" />;
  }

  if (movieDetailsData) {
    return (
      <>
        <Head>
          <title>{movieDetailsData.title} - ScreenVibe</title>
        </Head>
        <BackdropImageContainer>
          {movieDetailsData.backdrop_path ? (
            <Image
              alt={`${movieDetailsData.original_title}-backdrop`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={`${IMAGE_PIC_BASE_URL_W1280}${movieDetailsData.backdrop_path}`}
              fill
            />
          ) : (
            <FaQuestion size="100%" title={movieDetailsData.original_title} />
          )}
          <InformationContainer>
            <Row $justifyContent="space-between">
              <MediaTitle>{movieDetailsData.title}</MediaTitle>
              <Row $alignSelf="flex-start" $gap="1rem" m="0.25rem 0 0 0">
                <IconContainer
                  onClick={onWatchLaterClick}
                  cursor="pointer"
                  role="button"
                  whileTap={{ scale: 1 }}
                  color={theme.text}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileHover={{ scale: 1.2 }}
                  title={isWatchlisted ? "Remove from your watchlist" : "Add to your watchlist"}
                >
                  {isWatchlisted ? <MdWatchLater size={24} /> : <MdOutlineWatchLater size={24} />}
                </IconContainer>
                <IconContainer
                  onClick={onFavoriteClick}
                  cursor="pointer"
                  role="button"
                  whileTap={{ scale: 1 }}
                  color={theme.text}
                  animate={{ color: isFavorite ? theme.danger : theme.text }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileHover={{ scale: 1.2 }}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? <IoMdHeart size={24} /> : <IoMdHeartEmpty size={24} />}
                </IconContainer>
              </Row>
            </Row>
            <GenresTagger genres={movieDetailsData.genres} />
          </InformationContainer>
        </BackdropImageContainer>
        <MediaContent>
          <DescriptionBox
            mediaType="movie"
            release={movieDetailsData.release_date}
            budget={movieDetailsData.budget}
            revenue={movieDetailsData.revenue}
            voteAvg={movieDetailsData.vote_average}
          />
          <Row
            $flexWrap="wrap"
            $gap="1rem"
            $alignItems="flex-start"
            $justifyContent="space-between"
            m="1.5rem 0 0 0"
            $mobileL="justify-content: center;"
          >
            <Col $alignItems="flex-start" $gap="0.5rem" $flex="0 0 225px">
              <PosterImageContainer>
                {movieDetailsData.poster_path ? (
                  <Image
                    alt={`${movieDetailsData.original_title}-poster`}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    src={`${IMAGE_PIC_BASE_URL_W300}${movieDetailsData.poster_path}`}
                    fill
                    sizes="400px"
                  />
                ) : (
                  <FaQuestion size="100%" title={movieDetailsData.original_title} />
                )}
              </PosterImageContainer>
              <ProvidersBox
                result={
                  (watchProvidersData &&
                    getResultFromGlobalProviders(
                      ((regionInfo && regionInfo.country) as keyof MovieWatchProvidersDetails["results"]) || "US",
                      watchProvidersData.results
                    )) ||
                  null ||
                  null
                }
                isLoading={isLoadingWatchProvidersData}
              />
            </Col>
            <Col h="fit-content" $alignItems="flex-start" $justifyContent="flex-start" $flex="1 1 200px">
              <MediaContentHeader>Overview</MediaContentHeader>
              <MediaContentText>{movieDetailsData.overview}</MediaContentText>
              <RatingBox
                mediaType="movie"
                mediaTitle={movieDetailsData.title}
                mediaId={movieDetailsData.id}
                voteAvg={movieDetailsData.vote_average}
                voteCount={movieDetailsData.vote_count}
              />
              <CastBox mediaType="movie" cast={creditsData?.cast} isLoading={isLoadingCreditsData} />
            </Col>
          </Row>
          <Row m="1rem 0px 0px 0px" />
          {movieRecommendationsData && !!movieRecommendationsData.results.length && (
            <Category
              idx={0}
              title="Recommendations"
              data={movieRecommendationsData}
              isLoading={isLoadingMovieRecommedations}
            />
          )}
        </MediaContent>
      </>
    );
  }

  return null;
};

export default MovieContent;
