import React from "react";
import MainLayout from "../../../src/layouts/Main";
import CategoryLayout from "../../../src/layouts/Category";
import AiringTodayTvContent from "../../../src/components/Pages/Tv/Content/AiringToday";
import type { NextPageWithLayout } from "../../_app";

type Props = {};

const TvAiringTodayPage: NextPageWithLayout = (props: Props) => {
  return <AiringTodayTvContent />;
};

TvAiringTodayPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default TvAiringTodayPage;
