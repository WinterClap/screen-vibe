import { motion } from "framer-motion";
import React from "react";
import { SubcategoryItemCardContainer } from "./styles";
import type { SubcategoryItemProps } from "./SubcategoryItem";

const SubcategoryItemCard = motion(
  React.forwardRef<HTMLDivElement, SubcategoryItemProps & { handleDismiss: () => void }>(function SubcategoryItemCard(
    { backdropPath, genreIds, overview, posterPath, releaseDate, title, handleDismiss },
    ref
  ) {
    React.useEffect(() => {
      const dismissCard = () => {
        handleDismiss();
      };
      const onWindowKeyDown = (e: KeyboardEvent) => {
        console.log("key, ", e.key);
        if (e.key === "Escape") {
          dismissCard();
        }
      };
      window.addEventListener("keydown", onWindowKeyDown);

      return () => window.removeEventListener("keydown", onWindowKeyDown);
    }, [handleDismiss]);

    return <SubcategoryItemCardContainer ref={ref}>SubcategoryItemCard</SubcategoryItemCardContainer>;
  })
);

export default SubcategoryItemCard;
