import React from "react";
import { MOVIES_NOW_PLAYING_PER_PAGE } from "../../../../queryKeys";
import { getNowPlayingMovies } from "../../../../utils/api/movie";
import SubcategoryPageMovieContent from "../../Common/Subcategory/SubcategoryPageMovieContent";

type Props = {};

const MoviesNowPlayingContent = (props: Props) => {
  return (
    <SubcategoryPageMovieContent
      pathname="/category/movies/now-playing"
      pageTitle="Now Playing Movies"
      queryFn={getNowPlayingMovies}
      partialQueryKey={MOVIES_NOW_PLAYING_PER_PAGE}
    />
  );
};

export default MoviesNowPlayingContent;
