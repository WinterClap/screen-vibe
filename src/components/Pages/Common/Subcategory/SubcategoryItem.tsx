import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { IMAGE_PIC_BASE_URL_W780 } from "../../../../utils/api/constants";
import { SubcategoryItemContainer, SubcategoryItemFooter, SubcategoryItemText } from "./styles";
import SubcategoryItemCard from "./SubcategoryItemCard";

export type SubcategoryItemProps = {
  title: string;
  id: number;
  genreIds: number[];
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  handleSelectedItem?: (item: Omit<SubcategoryItemProps, "handleSelectedItem"> | null) => void;
};

const SubcategoryItem = motion(
  React.forwardRef<HTMLDivElement, SubcategoryItemProps>(function SubcategoryItem(
    { title, genreIds, id, isSelected, overview, posterPath, backdropPath, releaseDate, handleSelectedItem },
    ref
  ) {
    const onItemClick = (item: Omit<SubcategoryItemProps, "handleSelectedItem"> | null) => {
      console.log("itemclcik: ", item);
      handleSelectedItem?.(item);
    };

    return (
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          <SubcategoryItemContainer
            layout="position"
            animate={{
              opacity: isSelected ? 1 : 1,
            }}
            layoutId={`container-${id}`}
            key="normal"
            ref={ref}
            onClick={() => onItemClick({ backdropPath, genreIds, id, overview, posterPath, releaseDate, title })}
          >
            {posterPath && (
              <Image
                fill
                src={`${IMAGE_PIC_BASE_URL_W780}${posterPath}`}
                style={{ objectFit: "cover" }}
                alt={`${title}-poster`}
              />
            )}
            <SubcategoryItemFooter className="overview-footer">
              <SubcategoryItemText $highlight>{title}</SubcategoryItemText>
              <SubcategoryItemText>{overview}</SubcategoryItemText>
            </SubcategoryItemFooter>
          </SubcategoryItemContainer>

          {isSelected && (
            <SubcategoryItemCard
              exit={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: "-50%", x: "-50%" }}
              layoutId={`container-${id}`}
              key={id}
              id={id}
              title={title}
              posterPath={posterPath}
              backdropPath={backdropPath}
              genreIds={genreIds}
              overview={overview}
              releaseDate={releaseDate}
              handleDismiss={() => onItemClick?.(null)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    );
  })
);

export default SubcategoryItem;
