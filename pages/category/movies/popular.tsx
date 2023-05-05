import React from "react";
import MoviesPopularContent from "../../../src/components/Pages/Movies/Content/Popular";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const MoviesPopularPage: NextPageWithLayout = (props: Props) => {
  return <MoviesPopularContent />;
};

MoviesPopularPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesPopularPage;
