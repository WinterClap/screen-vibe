import React from "react";
import Head from "next/head";
import SubcategoryPageTvContent from "../../Common/Subcategory/SubcategoryPageTvContent";
import { TV_AIRING_TODAY_PER_PAGE } from "../../../../queryKeys";
import { getAiringTodayTv } from "../../../../utils/api/tv";

type Props = {};

const AiringTodayTvContent = (props: Props) => {
  return (
    <>
      <Head>
        <title>Airing Today - TV - ScreenVibe</title>
      </Head>
      <SubcategoryPageTvContent
        partialQueryKey={TV_AIRING_TODAY_PER_PAGE}
        pathname="/category/tv/airing-today"
        pageTitle="Airing Today (TV)"
        queryFn={getAiringTodayTv}
      />
    </>
  );
};

export default AiringTodayTvContent;
