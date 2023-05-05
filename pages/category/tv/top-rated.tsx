import React from "react";
import MainLayout from "../../../src/layouts/Main";
import CategoryLayout from "../../../src/layouts/Category";
import TopRatedTvContent from "../../../src/components/Pages/Tv/Content/TopRated";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const TvTopRatedPage: NextPageWithLayout = (props: Props) => {
  return <TopRatedTvContent />;
};

TvTopRatedPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default TvTopRatedPage;
