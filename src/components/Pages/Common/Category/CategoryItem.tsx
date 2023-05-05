import React from "react";
import Image from "next/image";
import Header from "../Subcategory/Header";
import { CategoryItemContainer, CategoryItemFooter, CategoryItemText } from "./styles";
import { IMAGE_PIC_BASE_URL_W1280 } from "../../../../utils/api/constants";
import { Col } from "../../../common";
import { getPartitionedDate } from "../utils";

type Props = {
  imageBackdropSrc: string | null;
  originalTitle: string;
  releaseDate: string;
  mediaId: number;
  mediaType: "movie" | "tv";
};

const CategoryItem = ({ imageBackdropSrc, originalTitle, releaseDate, mediaId, mediaType }: Props) => {
  if (!imageBackdropSrc) return null;
  const partitionedDate = getPartitionedDate(releaseDate);
  const year = (partitionedDate && partitionedDate.year) || null;

  return (
    <CategoryItemContainer>
      <Header type="categoryItem" mediaId={mediaId} mediaTitle={originalTitle} mediaType={mediaType} />
      <Image
        fill
        style={{ aspectRatio: "16/9", objectFit: "cover" }}
        src={`${IMAGE_PIC_BASE_URL_W1280}${imageBackdropSrc}`}
        alt={`${originalTitle}-backdrop`}
      />
      <CategoryItemFooter>
        <Col $zIndex={1} $gap={"2px"} w="100%" $justifyContent="space-between" $alignItems="flex-start">
          <CategoryItemText $highlight>{originalTitle}</CategoryItemText>
          {year && <CategoryItemText>{year}</CategoryItemText>}
        </Col>
      </CategoryItemFooter>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
