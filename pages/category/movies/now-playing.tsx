import React from "react";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import MoviesNowPlayingContent from "../../../src/components/Pages/Movies/Content/NowPlaying";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const MoviesNowPlayingPage: NextPageWithLayout = (props: Props) => {
  return <MoviesNowPlayingContent />;
};

MoviesNowPlayingPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default MoviesNowPlayingPage;
