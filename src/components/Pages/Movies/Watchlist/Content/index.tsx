import React from "react";
import Head from "next/head";
import { MOVIES_WATCHLIST_PER_PAGE } from "../../../../../queryKeys";
import SubcategoryPageMovieContent from "../../../Common/Subcategory/SubcategoryPageMovieContent";
import { getMoviesWatchlist } from "../../../../../utils/api/movie";

type Props = {};

const MoviesWatchlistContent = (props: Props) => {
  return (
    <>
      <Head>
        <title>Movies - Watchlist - ScreenVibe</title>
      </Head>
      <SubcategoryPageMovieContent
        shouldUseFavWatchlist
        pathname="/category/movies/watchlist"
        pageTitle="Watchlist Movies"
        queryFn={getMoviesWatchlist}
        partialQueryKey={MOVIES_WATCHLIST_PER_PAGE}
      />
    </>
  );
};

export default MoviesWatchlistContent;
