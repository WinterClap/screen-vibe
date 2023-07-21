import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuestion } from "react-icons/fa";
import { useRouter } from "next/router";
import { DEVICE_SIZES } from "../../../../constants";
import { getPxFromSize } from "../../../../utils";
import { IMAGE_PIC_BASE_URL_W780 } from "../../../../utils/api/constants";
import Header from "./Header";
import { SubcategoryItemContainer, SubcategoryItemFooter, SubcategoryItemText } from "./styles";

export type SubcategoryItemProps = {
  mediaType: "movie" | "tv";
  title: string;
  id: number;
  genreIds: number[];
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAvg: number;
  voteCount: number;
  handleSelectedItem?: (item: Omit<SubcategoryItemProps, "handleSelectedItem"> | null) => void;
};

export type SubcategoryTvItemProps = {
  mediaType: "movie" | "tv";
  title: string;
  id: number;
  genreIds: number[];
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAvg: number;
  voteCount: number;
  handleSelectedItem?: (item: Omit<SubcategoryItemProps, "handleSelectedItem"> | null) => void;
};

const SubcategoryItem = motion(
  React.forwardRef<HTMLDivElement, SubcategoryItemProps>(function SubcategoryItem(
    {
      title,
      genreIds,
      id,
      overview,
      posterPath,
      backdropPath,
      releaseDate,
      voteAvg,
      voteCount,
      mediaType,
      handleSelectedItem,
    },
    ref
  ) {
    const { push } = useRouter();
    const onItemClick = (item: Omit<SubcategoryItemProps, "handleSelectedItem">) => {
      if (window.innerWidth < getPxFromSize(DEVICE_SIZES.mobileL)) {
        push(`/${mediaType === "movie" ? "movie" : "tv"}/${item.id}`);
        return;
      }
      handleSelectedItem?.(item);
    };

    return (
      <motion.div layoutId={`container-${id}`}>
        <SubcategoryItemContainer
          layoutId={`${id}-img`}
          key="normal"
          // ref={ref}
          onClick={() =>
            onItemClick({
              backdropPath,
              genreIds,
              id,
              overview,
              posterPath,
              releaseDate,
              title,
              voteAvg,
              voteCount,
              mediaType,
            })
          }
        >
          <Header mediaTitle={title} mediaId={id} type="item" mediaType={mediaType} />
          {posterPath ? (
            <Image
              fill
              src={`${IMAGE_PIC_BASE_URL_W780}${posterPath}`}
              style={{ objectFit: "cover" }}
              alt={`${title}-poster`}
              sizes="200px"
            />
          ) : (
            <FaQuestion size="100%" title={title} />
          )}
          <SubcategoryItemFooter layoutId={`${id}-footer`} className="overview-footer">
            <SubcategoryItemText $highlight>{title}</SubcategoryItemText>
            <SubcategoryItemText>{overview}</SubcategoryItemText>
          </SubcategoryItemFooter>
        </SubcategoryItemContainer>
      </motion.div>
    );
  })
);

export default SubcategoryItem;
