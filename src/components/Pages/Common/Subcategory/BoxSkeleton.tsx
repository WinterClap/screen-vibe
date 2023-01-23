import React from "react";
import { Col } from "../../../common";
import { BoxSkeletonText } from "./styles";

const BoxSkeleton = () => {
  return (
    <Col w="100%" $gap="0.25rem" m="0.5rem 0 0 0" $alignItems="flex-start">
      <BoxSkeletonText />
      <BoxSkeletonText />
      <BoxSkeletonText />
    </Col>
  );
};

export default BoxSkeleton;
