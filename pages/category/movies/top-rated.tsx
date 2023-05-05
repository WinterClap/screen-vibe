import React from "react";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import MoviesTopRatedContent from "../../../src/components/Pages/Movies/Content/TopRated";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const MoviesTopRatedPage: NextPageWithLayout = (props: Props) => {
  return <MoviesTopRatedContent />;
};

MoviesTopRatedPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesTopRatedPage;
