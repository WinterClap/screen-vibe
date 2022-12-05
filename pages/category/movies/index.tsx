import React from "react";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { NextPageWithLayout } from "../../_app";

const MoviesPage: NextPageWithLayout = () => {
  return <div>MoviesPage</div>;
};

MoviesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesPage;
