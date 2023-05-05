import React from "react";
import SubcategoryPageTvContent from "../../Common/Subcategory/SubcategoryPageTvContent";
import { TV_TOP_RATED_PER_PAGE } from "../../../../queryKeys";
import { getTopRatedTv } from "../../../../utils/api/tv";

type Props = {};

const TopRatedTvContent = (props: Props) => {
  return (
    <SubcategoryPageTvContent
      partialQueryKey={TV_TOP_RATED_PER_PAGE}
      pathname="/category/tv/top-rated"
      pageTitle="Top Rated TV"
      queryFn={getTopRatedTv}
    />
  );
};

export default TopRatedTvContent;
