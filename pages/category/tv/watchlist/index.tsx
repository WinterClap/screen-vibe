import React from "react";
import CategoryLayout from "../../../../src/layouts/Category";
import MainLayout from "../../../../src/layouts/Main";
import type { NextPageWithLayout } from "../../../_app";
import TvWatchlistContent from "../../../../src/components/Pages/Tv/Watchlist/Content";

const TvWatchlistPage: NextPageWithLayout = () => {
  return <TvWatchlistContent />;
};

TvWatchlistPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default TvWatchlistPage;
