import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Head from "next/head";
import {
  MOVIES_UPCOMING,
  TV_ON_THE_AIR_PER_PAGE,
  TV_POPULAR_PER_PAGE,
  TV_TOP_RATED_PER_PAGE,
} from "../../../../queryKeys";
import type { RootState } from "../../../../store";
import { CategoryContentContainer } from "../../Common/Category/styles";
import { getAiringTodayTv, getOnTheAirTv, getPopularTv, getTopRatedTv } from "../../../../utils/api/tv";
import TvCategory from "../../Common/Category/TvCategory";

type Props = {};

const NUMBER_OF_SECTIONS = 4;
const TvContent = (props: Props) => {
  const indexes = [...new Array(NUMBER_OF_SECTIONS)].map((_, idx) => idx + 1);
  const locale = useSelector((state: RootState) => state.general.locale);
  const { data: popularTvData, isLoading: isPopularTvLoading } = useQuery({
    queryKey: [TV_POPULAR_PER_PAGE, 1],
    queryFn: () => getPopularTv({ locale }),
    enabled: !!locale,
  });

  const { data: topRatedTvData, isLoading: isTopRatedTvLoading } = useQuery({
    queryKey: [TV_TOP_RATED_PER_PAGE, 1],
    queryFn: () => getTopRatedTv({ locale }),
    enabled: !!locale,
  });

  const { data: airingTodayTvData, isLoading: isAiringTodayTvLoading } = useQuery({
    queryKey: MOVIES_UPCOMING,
    queryFn: () => getAiringTodayTv({ locale }),
    enabled: !!locale,
  });

  const { data: onTheAirTvData, isLoading: onTheAirTvIsLoading } = useQuery({
    queryKey: [TV_ON_THE_AIR_PER_PAGE, 1],
    queryFn: () => getOnTheAirTv({ locale }),
    enabled: !!locale,
  });

  return (
    <CategoryContentContainer>
      <Head>
        <title>Home - TV - ScreenVibe</title>
      </Head>
      <TvCategory
        idx={indexes[3]}
        size="normal"
        title="Popular"
        seeMoreHref="tv/popular"
        data={popularTvData}
        isLoading={isPopularTvLoading}
      />
      <TvCategory
        idx={indexes[2]}
        title="Top rated"
        seeMoreHref="tv/top-rated"
        data={topRatedTvData}
        isLoading={isTopRatedTvLoading}
      />
      <TvCategory
        idx={indexes[1]}
        title="Upcoming"
        seeMoreHref="tv/airing-today"
        data={airingTodayTvData}
        isLoading={isAiringTodayTvLoading}
      />
      <TvCategory
        idx={indexes[0]}
        title="On The Air"
        seeMoreHref="tv/on-the-air"
        data={onTheAirTvData}
        isLoading={onTheAirTvIsLoading}
      />
    </CategoryContentContainer>
  );
};

export default TvContent;
