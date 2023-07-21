import React from "react";
import Head from "next/head";
import { MOVIES_TOP_RATED_PER_PAGE } from "../../../../queryKeys";
import { getTopRatedMovies } from "../../../../utils/api/movie";
import SubcategoryPageMovieContent from "../../Common/Subcategory/SubcategoryPageMovieContent";

type Props = {};

const MoviesTopRatedContent = (props: Props) => {
  return (
    <>
      <Head>
        <title>Top Rated Movies - ScreenVibe</title>
      </Head>
      <SubcategoryPageMovieContent
        pathname="/category/movies/top-rated"
        pageTitle="Top Rated Movies"
        queryFn={getTopRatedMovies}
        partialQueryKey={MOVIES_TOP_RATED_PER_PAGE}
      />
    </>
  );
};

export default MoviesTopRatedContent;
