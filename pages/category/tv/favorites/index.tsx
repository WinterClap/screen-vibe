import React from "react";
import CategoryLayout from "../../../../src/layouts/Category";
import MainLayout from "../../../../src/layouts/Main";
import type { NextPageWithLayout } from "../../../_app";
import TvFavoritesContent from "../../../../src/components/Pages/Tv/Favorites/Content";

const TvFavoritesPage: NextPageWithLayout = () => {
  return <TvFavoritesContent />;
};

TvFavoritesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default TvFavoritesPage;
