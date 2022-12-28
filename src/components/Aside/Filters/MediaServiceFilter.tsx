import React from "react";
import MediaServiceFilterSkeleton from "./MediaServiceFilterSkeleton";
import { FilterContainer } from "./styles";

type MediaServiceProps = {};

const MediaServiceFilter = ({}: MediaServiceProps) => {
  const isLoading = true;
  if (isLoading) {
    return <MediaServiceFilterSkeleton />;
  }
  return <FilterContainer>MediaServiceFilter</FilterContainer>;
};

export default MediaServiceFilter;
