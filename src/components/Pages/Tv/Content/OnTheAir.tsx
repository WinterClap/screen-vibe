import React from "react";
import SubcategoryPageTvContent from "../../Common/Subcategory/SubcategoryPageTvContent";
import { TV_ON_THE_AIR_PER_PAGE } from "../../../../queryKeys";
import { getOnTheAirTv } from "../../../../utils/api/tv";

type Props = {};

const OnTheAirTvContent = (props: Props) => {
  return (
    <SubcategoryPageTvContent
      partialQueryKey={TV_ON_THE_AIR_PER_PAGE}
      pathname="/category/tv/on-the-air"
      pageTitle="On the Air (TV)"
      queryFn={getOnTheAirTv}
    />
  );
};

export default OnTheAirTvContent;
