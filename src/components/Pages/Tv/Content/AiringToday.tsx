import React from "react";
import SubcategoryPageTvContent from "../../Common/Subcategory/SubcategoryPageTvContent";
import { TV_AIRING_TODAY_PER_PAGE } from "../../../../queryKeys";
import { getAiringTodayTv } from "../../../../utils/api/tv";

type Props = {};

const AiringTodayTvContent = (props: Props) => {
  return (
    <SubcategoryPageTvContent
      partialQueryKey={TV_AIRING_TODAY_PER_PAGE}
      pathname="/category/tv/airing-today"
      pageTitle="Airing Today (TV)"
      queryFn={getAiringTodayTv}
    />
  );
};

export default AiringTodayTvContent;
