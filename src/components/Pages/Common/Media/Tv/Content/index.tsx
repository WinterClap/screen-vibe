import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { FaQuestion } from "react-icons/fa";
import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import MediaSkeleton from "../../MediaSkeleton";
import useTvInfo from "../../../../../../hooks/useTvInfo";
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
  TV_CREDITS_BASE_KEY,
  TV_RECOMMENDATIONS_PER_PAGE,
  TV_WATCH_PROVIDERS_BASE_KEY,
} from "../../../../../../queryKeys";
import { getRecommendationsForTv } from "../../../../../../utils/api/movie";
import { MovieWatchProvidersDetails } from "../../../../../../../pages/api/movie/watch/providers";
import CastBox from "../../../Subcategory/CastBox";
import RatingBox from "../../../Subcategory/RatingBox";
import useInteractionOptions from "../../../../../../hooks/useInteractionOptions";
import { getCreditsForTv, getWatchProvidersForTv } from "../../../../../../utils/api/tv";
import TvCategory from "../../../Category/TvCategory";
import Head from "next/head";

type Props = {
  id: number;
};

const TvContent = ({ id }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.general.locale);
  const { tvDetailsData, tvDetailsIsError, tvDetailsIsLoading } = useTvInfo({
    language: locale,
    tv_id: id,
  });
  const { data: watchProvidersData, isLoading: isLoadingWatchProvidersData } = useQuery({
    queryKey: [TV_WATCH_PROVIDERS_BASE_KEY, `${id}`],
    queryFn: () => getWatchProvidersForTv({ tv_id: id }),
    enabled: Boolean(id),
    staleTime: Infinity,
  });
  const { data: creditsData, isLoading: isLoadingCreditsData } = useQuery({
    queryKey: [TV_CREDITS_BASE_KEY, `${id}`],
    queryFn: () => getCreditsForTv({ tv_id: id, locale }),
    enabled: !!locale,
    staleTime: Infinity,
  });
  const { data: tvRecommendationsData, isLoading: isLoadingTvRecommedations } = useQuery({
    queryKey: [TV_RECOMMENDATIONS_PER_PAGE, `${id}`, 1],
    queryFn: () => getRecommendationsForTv({ tv_id: id, locale }),
    enabled: !!locale,
    staleTime: Infinity,
  });
  const { isWatchlisted, isFavorite, onFavoriteClick, onWatchLaterClick } = useInteractionOptions({
    mediaId: id,
    mediaType: "tv",
    mediaTitle: tvDetailsData?.name || "",
  });
  const regionInfo = getCountryAndLanguageFromLocale(locale);

  console.log("tvDetailsData: ", tvDetailsData);

  React.useEffect(() => {
    if (tvDetailsIsError) {
      dispatch(setToastData({ content: "Error fetching tv info", icon: "danger" }));
    }
  });

  if (tvDetailsIsLoading) {
    return <MediaSkeleton />;
  }

  if (tvDetailsIsError) {
    return <MediaError mediaType="tv" />;
  }

  if (tvDetailsData) {
    return (
      <>
        <Head>
          <title>{tvDetailsData.name} - ScreenVibe</title>
        </Head>
        <BackdropImageContainer>
          {tvDetailsData.backdrop_path ? (
            <Image
              alt={`${tvDetailsData.name}-backdrop`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={`${IMAGE_PIC_BASE_URL_W1280}${tvDetailsData.backdrop_path}`}
              fill
            />
          ) : (
            <FaQuestion size="100%" title={tvDetailsData.name} />
          )}
          <InformationContainer>
            <Row $justifyContent="space-between">
              <MediaTitle>{tvDetailsData.name}</MediaTitle>
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
            <GenresTagger genres={tvDetailsData.genres} />
          </InformationContainer>
        </BackdropImageContainer>
        <MediaContent>
          <DescriptionBox
            mediaType="tv"
            release={tvDetailsData.first_air_date}
            numberOfSeasons={tvDetailsData.number_of_seasons}
            voteAvg={tvDetailsData.vote_average}
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
                {tvDetailsData.poster_path ? (
                  <Image
                    alt={`${tvDetailsData.name}-poster`}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    src={`${IMAGE_PIC_BASE_URL_W300}${tvDetailsData.poster_path}`}
                    fill
                    sizes="400px"
                  />
                ) : (
                  <FaQuestion size="100%" title={tvDetailsData.name} />
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
              <MediaContentText>{tvDetailsData.overview}</MediaContentText>
              <RatingBox
                mediaType="tv"
                mediaTitle={tvDetailsData.name}
                mediaId={tvDetailsData.id}
                voteAvg={tvDetailsData.vote_average}
                voteCount={tvDetailsData.vote_count}
              />
              <CastBox mediaType="tv" cast={creditsData?.cast} isLoading={isLoadingCreditsData} />
            </Col>
          </Row>
          <Row m="1rem 0px 0px 0px" />
          {tvRecommendationsData && !!tvRecommendationsData.results.length && (
            <TvCategory
              idx={0}
              title="Recommendations"
              data={tvRecommendationsData}
              isLoading={isLoadingTvRecommedations}
            />
          )}
        </MediaContent>
      </>
    );
  }

  return null;
};

export default TvContent;
