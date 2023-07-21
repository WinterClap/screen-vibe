import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  MOVIES_GENRES,
  MOVIE_CREDITS_BASE_KEY,
  MOVIE_WATCH_PROVIDERS_BASE_KEY,
  TV_CREDITS_BASE_KEY,
  TV_GENRES,
  TV_WATCH_PROVIDERS_BASE_KEY,
} from "../../../../queryKeys";
import { IMAGE_PIC_BASE_URL_W780 } from "../../../../utils/api/constants";
import { Col } from "../../../common";
import {
  SubcategoryItemCardBackdropImageContainer,
  SubcategoryItemCardContainer,
  SubcategoryItemCardFooter,
  SubcategoryItemCardFooterText,
} from "./styles";
import type { SubcategoryItemProps } from "./SubcategoryItem";
import type { RootState } from "../../../../store";
import type { MovieWatchProvidersDetails } from "../../../../../pages/api/movie/watch/providers";
import type { TvWatchProvidersDetails } from "../../../../../pages/api/tv/watch/providers";
import { getCreditsForMovie, getGenreMovieList, getWatchProvidersForMovie } from "../../../../utils/api/movie";
import { getCreditsForTv, getGenreTvList, getWatchProvidersForTv } from "../../../../utils/api/tv";
import { getGenresFromGlobalGenres, getResultFromGlobalProviders, getResultFromGlobalTvProviders } from "./utils";
import { getCountryAndLanguageFromLocale } from "../../../SplashScreen/utils";
import GenresBox from "./GenresBox";
import ProvidersBox from "./ProvidersBox";
import CastBox from "./CastBox";
import Header from "./Header";
import RatingBox from "./RatingBox";
import ReleaseDateBox from "./ReleaseDateBox";
import { FaQuestion } from "react-icons/fa";

const SubcategoryItemCard = motion(
  React.forwardRef<HTMLDivElement, SubcategoryItemProps & { handleDismiss: () => void }>(function SubcategoryItemCard(
    {
      backdropPath,
      genreIds,
      overview,
      posterPath,
      releaseDate,
      title,
      id,
      voteAvg,
      voteCount,
      mediaType,
      handleDismiss,
    },
    ref
  ) {
    const locale = useSelector((state: RootState) => state.general.locale);
    const { data: globalGenresMovieData, isLoading: isLoadingGenresMovieData } = useQuery({
      queryKey: MOVIES_GENRES,
      queryFn: () => getGenreMovieList({ locale }),
      enabled: !!locale && mediaType === "movie",
      staleTime: Infinity,
    });
    const { data: globalGenresTvData, isLoading: isLoadingGenresTvData } = useQuery({
      queryKey: TV_GENRES,
      queryFn: () => getGenreTvList({ locale }),
      enabled: !!locale && mediaType === "tv",
      staleTime: Infinity,
    });
    const { data: creditsData, isLoading: isLoadingCreditsData } = useQuery({
      queryKey: [MOVIE_CREDITS_BASE_KEY, `${id}`],
      queryFn: () => getCreditsForMovie({ movie_id: id, locale }),
      enabled: !!locale && mediaType === "movie",
      staleTime: Infinity,
    });
    const { data: creditsTvData, isLoading: isLoadingCreditsTvData } = useQuery({
      queryKey: [TV_CREDITS_BASE_KEY, `${id}`],
      queryFn: () => getCreditsForTv({ tv_id: id, locale }),
      enabled: !!locale && mediaType === "tv",
      staleTime: Infinity,
    });
    const { data: watchProvidersData, isLoading: isLoadingWatchProvidersData } = useQuery({
      queryKey: [MOVIE_WATCH_PROVIDERS_BASE_KEY, `${id}`],
      queryFn: () => getWatchProvidersForMovie({ movie_id: id }),
      enabled: mediaType === "movie",
      staleTime: Infinity,
    });
    const { data: watchProvidersTvData, isLoading: isLoadingWatchProvidersTvData } = useQuery({
      queryKey: [TV_WATCH_PROVIDERS_BASE_KEY, `${id}`],
      queryFn: () => getWatchProvidersForTv({ tv_id: id }),
      enabled: mediaType === "tv",
      staleTime: Infinity,
    });
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
    const backdropImageContainerHeight = (Math.min(0.9 * windowWidth, 750) * 9) / 16;
    const posterImageContainerWidth = Math.min(windowWidth * 0.33, 200);
    const regionInfo = getCountryAndLanguageFromLocale(locale);

    React.useEffect(() => {
      const dismissCard = () => {
        handleDismiss();
      };
      const onWindowKeyDown = (e: KeyboardEvent) => {
        console.log("key, ", e.key);
        if (e.key === "Escape") {
          dismissCard();
        }
      };
      window.addEventListener("keydown", onWindowKeyDown);

      return () => window.removeEventListener("keydown", onWindowKeyDown);
    }, [handleDismiss]);

    React.useEffect(() => {
      const onWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", onWindowResize);

      () => window.removeEventListener("resize", onWindowResize);
    }, []);

    return (
      <SubcategoryItemCardContainer
        layoutId={`container-${id}`}
        tabIndex={-1}
        key={`item-card-container-${id}`}
        animate={{ width: Math.min(0.9 * windowWidth, 750), transition: { delay: 0.25, ease: "easeInOut" } }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          layoutId={`${id}-img`}
          style={{
            width: posterImageContainerWidth,
            height: "400px",
            position: "absolute",
            zIndex: 1,
            top: backdropImageContainerHeight / 2,
          }}
        >
          {posterPath ? (
            <Image
              fill
              src={`${IMAGE_PIC_BASE_URL_W780}${posterPath}`}
              style={{ objectFit: "cover" }}
              alt={`${title}-poster`}
              sizes="200px"
            />
          ) : (
            <FaQuestion size="100%" title={title} />
          )}
        </motion.div>
        <SubcategoryItemCardBackdropImageContainer>
          <Header mediaTitle={title} mediaId={id} mediaType={mediaType} type="card" />
          {backdropPath ? (
            <Image
              fill
              style={{ objectFit: "cover", aspectRatio: "16/9" }}
              alt={`${title}-backdrop`}
              src={`${IMAGE_PIC_BASE_URL_W780}${backdropPath}`}
            />
          ) : (
            <FaQuestion size="100%" title={title} />
          )}
        </SubcategoryItemCardBackdropImageContainer>
        <SubcategoryItemCardFooter
          key="card-footer-id"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Col
            m={`${400 - backdropImageContainerHeight / 2}px 0px 0px 0px`}
            w={posterImageContainerWidth + "px"}
            $flex="0 0 auto"
            p="0.5rem"
            $alignItems="flex-start"
          >
            {mediaType === "movie" ? (
              <GenresBox
                genres={globalGenresMovieData && getGenresFromGlobalGenres(genreIds, globalGenresMovieData.genres)}
                isLoading={isLoadingGenresMovieData}
              />
            ) : (
              <GenresBox
                genres={globalGenresTvData && getGenresFromGlobalGenres(genreIds, globalGenresTvData.genres)}
                isLoading={isLoadingGenresTvData}
              />
            )}
            <ReleaseDateBox mediaType={mediaType} releaseDate={releaseDate} />
            <ProvidersBox
              result={
                watchProvidersData
                  ? getResultFromGlobalProviders(
                      ((regionInfo && regionInfo.country) as keyof MovieWatchProvidersDetails["results"]) || "US",
                      watchProvidersData.results
                    ) || null
                  : watchProvidersTvData
                  ? getResultFromGlobalTvProviders(
                      ((regionInfo && regionInfo.country) as keyof TvWatchProvidersDetails["results"]) || "US",
                      watchProvidersTvData.results
                    ) || null
                  : null
              }
              isLoading={isLoadingWatchProvidersData || isLoadingWatchProvidersTvData}
            />
          </Col>
          <Col p="0 1rem" $alignItems="flex-start">
            <SubcategoryItemCardFooterText $highlight>{title}</SubcategoryItemCardFooterText>
            <SubcategoryItemCardFooterText>{overview}</SubcategoryItemCardFooterText>
            <RatingBox mediaType={mediaType} mediaTitle={title} mediaId={id} voteAvg={voteAvg} voteCount={voteCount} />
            <CastBox
              mediaType={mediaType}
              cast={mediaType === "movie" ? creditsData?.cast : creditsTvData?.cast}
              isLoading={mediaType === "movie" ? isLoadingCreditsData : isLoadingCreditsTvData}
            />
          </Col>
        </SubcategoryItemCardFooter>
      </SubcategoryItemCardContainer>
    );
  })
);

export default SubcategoryItemCard;
