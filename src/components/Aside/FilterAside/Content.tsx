import React from "react";
import { AsideSection } from "../../../layouts/Main/stlyes";
import { AsideContent } from "../styles";
import GenreFilter from "../Filters/GenreFilter";
import MediaServiceFilter from "../Filters/MediaServiceFilter";
import UserDisplayInfo from "../UserDisplayInfo";

type Props = {
  isVisible: boolean;
};

const Content = ({ isVisible }: Props) => {
  return (
    <AsideContent $visible={isVisible}>
      <AsideSection>
        <UserDisplayInfo />
        <MediaServiceFilter />
        <GenreFilter />
      </AsideSection>
    </AsideContent>
  );
};

export default Content;
