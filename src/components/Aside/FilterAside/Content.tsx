import React from "react";
import { AsideSection } from "../../../layouts/Main/styles";
import { AsideContent } from "../styles";
import GenreFilter from "../Filters/GenreFilter";
import MediaServiceFilter from "../Filters/MediaServiceFilter";
import UserDisplayInfo from "../UserDisplayInfo";

type Props = {
  isVisible?: boolean;
  requestCloseAside?: () => void;
};

const Content = ({ isVisible, requestCloseAside }: Props) => {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestCloseAside?.();
      }
    };
    if (isVisible) {
      window.addEventListener("keydown", onKeyDown);

      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [isVisible, requestCloseAside]);

  return (
    <AsideContent $visible={isVisible}>
      <AsideSection>
        <UserDisplayInfo requestCloseAside={requestCloseAside} />
        <MediaServiceFilter />
        <GenreFilter />
      </AsideSection>
    </AsideContent>
  );
};

export default Content;
