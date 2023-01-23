import React from "react";
import { getMonthText, getPartitionedDate } from "../utils";
import { SubcategorySideBarSection, SubcategorySideBarHeader, SubcategorySideBarText } from "./styles";

type Props = {
  releaseDate: string;
};

const ReleaseDateBox = ({ releaseDate }: Props) => {
  const { day, month, year } = getPartitionedDate(releaseDate);
  return (
    <SubcategorySideBarSection>
      <SubcategorySideBarHeader>Release date</SubcategorySideBarHeader>
      <SubcategorySideBarText>
        {getMonthText(month)} {day}, {year}
      </SubcategorySideBarText>
    </SubcategorySideBarSection>
  );
};

export default ReleaseDateBox;
