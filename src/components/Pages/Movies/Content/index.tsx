import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { MOVIES_POPULAR } from "../../../../queryKeys";
import type { RootState } from "../../../../store";
import { getPopularMovies } from "../../../../utils/api/movie";
import Category from "../../Common/Category";
import { CategoryContentContainer } from "../../Common/Category/styles";

type Props = {};

const MoviesContent = (props: Props) => {
  const locale = useSelector((state: RootState) => state.general.locale);
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } = useQuery({
    queryKey: MOVIES_POPULAR,
    queryFn: () => getPopularMovies({ locale }),
    enabled: !!locale,
  });

  return (
    <CategoryContentContainer>
      <Category
        size="normal"
        title="Popular"
        seeMoreHref="movies/popular"
        data={popularMoviesData}
        isLoading={isPopularMoviesLoading}
      />
      <Category title="Upcoming" seeMoreHref="upcoming" data={{}} isLoading={true} />
      <Category title="Top rated" seeMoreHref="top-rated" data={{}} isLoading={true} />
      {/* <Category title="Upcoming" href="upcoming" />
    <Category title="Upcoming" href="popular" />
    <Category title="Top rated" href="popular" /> */}
    </CategoryContentContainer>
  );
};

export default MoviesContent;
