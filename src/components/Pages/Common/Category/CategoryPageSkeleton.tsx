import React from "react";
import { Row } from "../../../common";
import { CategoryContainerSkeleton, CategoryItemSkeleton, CategoryTextSkeleton } from "./styles";

type Props = {
  size?: "normal" | "small";
};

const CategoryPageSkeleton = ({ size = "small" }: Props) => {
  return (
    <CategoryContainerSkeleton>
      <Row $justifyContent="space-between" m="0px 0px 10px 0px">
        <Row $gap="20px" $tablet="gap: 10px; span:nth-child(2){display: none;};">
          <CategoryTextSkeleton $width={200} />
          <CategoryTextSkeleton $width={30} />
          <CategoryTextSkeleton $width={100} />
        </Row>
        <CategoryTextSkeleton $width={60} />
      </Row>
      <Row
        $flexWrap="wrap"
        $gap="10px"
        $justifyContent="space-between"
        $mobileL="span:nth-last-child(-n+2){display:none;}; span{width: 100%}"
      >
        <CategoryItemSkeleton $size={size} />
        <CategoryItemSkeleton $size={size} />
        <CategoryItemSkeleton $size={size} />
      </Row>
    </CategoryContainerSkeleton>
  );
};

export default CategoryPageSkeleton;
