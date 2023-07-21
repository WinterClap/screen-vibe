import React from "react";
import Head from "next/head";
import { MOVIES_FAVORITES_PER_PAGE } from "../../../../../queryKeys";
import SubcategoryPageMovieContent from "../../../Common/Subcategory/SubcategoryPageMovieContent";
import { getFavoriteMovies } from "../../../../../utils/api/movie";

type Props = {};

const MoviesFavoritesContent = (props: Props) => {
  return (
    <>
      <Head>
        <title>Movies - Favorites - ScreenVibe</title>
      </Head>
      <SubcategoryPageMovieContent
        shouldUseFavWatchlist
        pathname="/category/movies/favorites"
        pageTitle="Favorite Movies"
        queryFn={getFavoriteMovies}
        partialQueryKey={MOVIES_FAVORITES_PER_PAGE}
      />
    </>
  );
};

export default MoviesFavoritesContent;
