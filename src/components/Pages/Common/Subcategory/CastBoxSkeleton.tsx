import React from "react";
import { Col } from "../../../common";
import { BoxSkeletonText, CastBoxSkeletonContainer, CastBoxSkeletonItem, CastBoxSkeletonItemContainer } from "./styles";

const CastBoxSkeleton = () => (
  <CastBoxSkeletonContainer>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
      <CastBoxSkeletonItemContainer key={item}>
        <CastBoxSkeletonItem />
        <Col w="100%" $gap="5px 0px">
          <BoxSkeletonText $h="0.5rem" />
          <BoxSkeletonText $h="0.4rem" />
        </Col>
      </CastBoxSkeletonItemContainer>
    ))}
  </CastBoxSkeletonContainer>
);

export default CastBoxSkeleton;
