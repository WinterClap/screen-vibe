import React from "react";
import { MOVIES_UPCOMING_PER_PAGE } from "../../../../queryKeys";
import { getUpcomingMovies } from "../../../../utils/api/movie";
import SubcategoryPageMovieContent from "../../Common/Subcategory/SubcategoryPageMovieContent";

type Props = {};

const MoviesUpcomingContent = (props: Props) => {
  return (
    <SubcategoryPageMovieContent
      pathname="/category/movies/upcoming"
      pageTitle="Upcoming Movies"
      queryFn={getUpcomingMovies}
      partialQueryKey={MOVIES_UPCOMING_PER_PAGE}
    />
  );
};

export default MoviesUpcomingContent;
