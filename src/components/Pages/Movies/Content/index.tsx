import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { MOVIES_NOW_PLAYING, MOVIES_POPULAR, MOVIES_TOP_RATED, MOVIES_UPCOMING } from "../../../../queryKeys";
import type { RootState } from "../../../../store";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../../../utils/api/movie";
import Category from "../../Common/Category";
import { CategoryContentContainer } from "../../Common/Category/styles";
import Head from "next/head";

type Props = {};

const NUMBER_OF_SECTIONS = 4;
const MoviesContent = (props: Props) => {
  const indexes = [...new Array(NUMBER_OF_SECTIONS)].map((_, idx) => idx + 1);
  const locale = useSelector((state: RootState) => state.general.locale);
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } = useQuery({
    queryKey: MOVIES_POPULAR,
    queryFn: () => getPopularMovies({ locale }),
    enabled: !!locale,
  });

  const { data: topRatedMoviesData, isLoading: isTopRatedMoviesLoading } = useQuery({
    queryKey: MOVIES_TOP_RATED,
    queryFn: () => getTopRatedMovies({ locale }),
    enabled: !!locale,
  });

  const { data: upcomingMoviesData, isLoading: isUpcomingMoviesLoading } = useQuery({
    queryKey: MOVIES_UPCOMING,
    queryFn: () => getUpcomingMovies({ locale }),
    enabled: !!locale,
  });

  const { data: nowPlayingMoviesData, isLoading: isNowPlayingMoviesLoading } = useQuery({
    queryKey: MOVIES_NOW_PLAYING,
    queryFn: () => getNowPlayingMovies({ locale }),
    enabled: !!locale,
  });

  return (
    <CategoryContentContainer>
      <Head>
        <title>Movies - Home - ScreenVibe</title>
      </Head>
      <Category
        idx={indexes[3]}
        size="normal"
        title="Popular"
        seeMoreHref="movies/popular"
        data={popularMoviesData}
        isLoading={isPopularMoviesLoading}
      />
      <Category
        idx={indexes[2]}
        title="Now Playing"
        seeMoreHref="movies/now-playing"
        data={nowPlayingMoviesData}
        isLoading={isNowPlayingMoviesLoading}
      />
      <Category
        idx={indexes[1]}
        title="Top rated"
        seeMoreHref="movies/top-rated"
        data={topRatedMoviesData}
        isLoading={isTopRatedMoviesLoading}
      />
      <Category
        idx={indexes[0]}
        title="Upcoming"
        seeMoreHref="movies/upcoming"
        data={upcomingMoviesData}
        isLoading={isUpcomingMoviesLoading}
      />
    </CategoryContentContainer>
  );
};

export default MoviesContent;
