import React from "react";
import MainLayout from "../../../src/layouts/Main";
import CategoryLayout from "../../../src/layouts/Category";
import type { NextPageWithLayout } from "../../_app";
import OnTheAirTvContent from "../../../src/components/Pages/Tv/Content/OnTheAir";

type Props = {};

const TvAiringTodayPage: NextPageWithLayout = (props: Props) => {
  return <OnTheAirTvContent />;
};

TvAiringTodayPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default TvAiringTodayPage;
