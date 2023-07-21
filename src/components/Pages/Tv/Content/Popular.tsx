import React from "react";
import Head from "next/head";
import SubcategoryPageTvContent from "../../Common/Subcategory/SubcategoryPageTvContent";
import { TV_POPULAR_PER_PAGE } from "../../../../queryKeys";
import { getPopularTv } from "../../../../utils/api/tv";

type Props = {};

const TvPopularContent = (props: Props) => {
  return (
    <>
      <Head>
        <title> Popular - TV - ScreenVibe</title>
      </Head>
      <SubcategoryPageTvContent
        partialQueryKey={TV_POPULAR_PER_PAGE}
        pathname="/category/tv/popular"
        pageTitle="Popular TV"
        queryFn={getPopularTv}
      />
    </>
  );
};

export default TvPopularContent;
