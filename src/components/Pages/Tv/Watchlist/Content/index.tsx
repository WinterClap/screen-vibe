import React from "react";
import { TV_WATCHLIST_PER_PAGE } from "../../../../../queryKeys";
import SubcategoryPageTvContent from "../../../Common/Subcategory/SubcategoryPageTvContent";
import { getTvWatchlist } from "../../../../../utils/api/movie";

type Props = {};

const TvWatchlistContent = (props: Props) => {
  return (
    <SubcategoryPageTvContent
      shouldUseFavWatchlist
      pathname="/category/tv/watchlist"
      pageTitle="Watchlist TV"
      queryFn={getTvWatchlist}
      partialQueryKey={TV_WATCHLIST_PER_PAGE}
    />
  );
};

export default TvWatchlistContent;
