import React from "react";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import MoviesUpcomingContent from "../../../src/components/Pages/Movies/Content/Upcoming";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const MoviesTopRatedPage: NextPageWithLayout = (props: Props) => {
  return <MoviesUpcomingContent />;
};

MoviesTopRatedPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesTopRatedPage;
