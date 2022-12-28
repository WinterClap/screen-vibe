import React from "react";
import GenreFilterSkeleton from "./GenreFilterSkeleton";
import { FilterContainer } from "./styles";

type Props = {};

const GenreFilter = ({}: Props) => {
  const isLoading = true;
  if (isLoading) {
    return <GenreFilterSkeleton />;
  }
  return <FilterContainer>GenreFilter</FilterContainer>;
};

export default GenreFilter;
