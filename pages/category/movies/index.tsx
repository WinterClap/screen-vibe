import React from "react";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { NextPageWithLayout } from "../../_app";
import useAuth from "../../../src/hooks/useAuth";
import MoviesContent from "../../../src/components/Pages/Movies/Content";

const MoviesPage: NextPageWithLayout = () => {
  useAuth();

  return <MoviesContent />;
};

MoviesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesPage;
