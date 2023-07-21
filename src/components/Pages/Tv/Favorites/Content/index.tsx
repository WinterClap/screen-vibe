import React from "react";
import { TV_FAVORITES_PER_PAGE } from "../../../../../queryKeys";
import SubcategoryPageTvContent from "../../../Common/Subcategory/SubcategoryPageTvContent";
import { getFavoriteTv } from "../../../../../utils/api/movie";

type Props = {};

const TvFavoritesContent = (props: Props) => {
  return (
    <SubcategoryPageTvContent
      shouldUseFavWatchlist
      pathname="/category/tv/favorites"
      pageTitle="Favorite TV"
      queryFn={getFavoriteTv}
      partialQueryKey={TV_FAVORITES_PER_PAGE}
    />
  );
};

export default TvFavoritesContent;
