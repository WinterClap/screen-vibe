import React from "react";
import CategoryLayout from "../../../../src/layouts/Category";
import MainLayout from "../../../../src/layouts/Main";
import type { NextPageWithLayout } from "../../../_app";
import MoviesWatchlistContent from "../../../../src/components/Pages/Movies/Watchlist/Content";

const MoviesWatchlistPage: NextPageWithLayout = () => {
  return <MoviesWatchlistContent />;
};

MoviesWatchlistPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesWatchlistPage;
