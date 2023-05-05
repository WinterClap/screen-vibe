import React from "react";
import type { NextPageWithLayout } from "../../_app";
import MainLayout from "../../../src/layouts/Main";
import CategoryLayout from "../../../src/layouts/Category";
import TvPopularContent from "../../../src/components/Pages/Tv/Content/Popular";

type Props = {};

const tvPopularPage: NextPageWithLayout = (props: Props) => {
  return <TvPopularContent />;
};

tvPopularPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default tvPopularPage;
