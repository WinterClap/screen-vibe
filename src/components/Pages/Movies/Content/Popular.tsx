import React from "react";
import Head from "next/head";
import { MOVIES_POPULAR_PER_PAGE } from "../../../../queryKeys";
import { getPopularMovies } from "../../../../utils/api/movie";
import SubcategoryPageMovieContent from "../../Common/Subcategory/SubcategoryPageMovieContent";

type Props = {};

const MoviesPopularContent = (props: Props) => {
  return (
    <>
      <Head>
        <title>Popular Movies - ScreenVibe</title>
      </Head>
      <SubcategoryPageMovieContent
        pathname="/category/movies/popular"
        pageTitle="Popular Movies"
        queryFn={getPopularMovies}
        partialQueryKey={MOVIES_POPULAR_PER_PAGE}
      />
    </>
  );
};

export default MoviesPopularContent;
