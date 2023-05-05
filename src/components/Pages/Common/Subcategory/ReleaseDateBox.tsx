import React from "react";
import { getMonthText, getPartitionedDate } from "../utils";
import { SubcategorySideBarSection, SubcategorySideBarHeader, SubcategorySideBarText } from "./styles";

type Props = {
  mediaType: "movie" | "tv";
  releaseDate: string;
};

const ReleaseDateBox = ({ mediaType, releaseDate }: Props) => {
  const partitionedDate = getPartitionedDate(releaseDate);

  return (
    <SubcategorySideBarSection>
      <SubcategorySideBarHeader>{mediaType === "movie" ? "Release date" : "First air date"}</SubcategorySideBarHeader>
      {partitionedDate && (
        <SubcategorySideBarText>
          {getMonthText(partitionedDate.month)} {partitionedDate.day}, {partitionedDate.year}
        </SubcategorySideBarText>
      )}
    </SubcategorySideBarSection>
  );
};

export default ReleaseDateBox;
