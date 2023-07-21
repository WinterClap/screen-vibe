import React from "react";
import CategoryLayout from "../../../../src/layouts/Category";
import MainLayout from "../../../../src/layouts/Main";
import type { NextPageWithLayout } from "../../../_app";
import MoviesFavoritesContent from "../../../../src/components/Pages/Movies/Favorites/Content";

const MoviesFavoritesPage: NextPageWithLayout = () => {
  return <MoviesFavoritesContent />;
};

MoviesFavoritesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesFavoritesPage;
