import React from "react";
import Image from "next/image";
import { CategoryItemContainer, CategoryItemFooter, CategoryItemText } from "./styles";
import { IMAGE_PIC_BASE_URL_W1280 } from "../../../../utils/api/constants";
import { Col } from "../../../common";
import { getPartitionedDate } from "../utils";

type Props = {
  imageBackdropSrc: string | null;
  originalTitle: string;
  releaseDate: string;
};

const CategoryItem = ({ imageBackdropSrc, originalTitle, releaseDate }: Props) => {
  if (!imageBackdropSrc) return null;

  return (
    <CategoryItemContainer>
      <Image
        fill
        style={{ aspectRatio: "16/9", objectFit: "cover" }}
        src={`${IMAGE_PIC_BASE_URL_W1280}${imageBackdropSrc}`}
        alt={`${originalTitle}-backdrop`}
      />
      <CategoryItemFooter>
        <Col $zIndex={1} $gap={"2px"} w="100%" $justifyContent="space-between" $alignItems="flex-start">
          <CategoryItemText $highlight>{originalTitle}</CategoryItemText>
          <CategoryItemText>{getPartitionedDate(releaseDate).year}</CategoryItemText>
        </Col>
      </CategoryItemFooter>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
