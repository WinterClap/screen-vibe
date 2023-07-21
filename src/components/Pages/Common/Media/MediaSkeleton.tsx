import React from "react";
import { TextSkeleton, SkeletonContainer, SkeletonRect } from "./styles";
import { Col, Row } from "../../../common";

const MovieSkeleton = () => (
  <SkeletonContainer>
    <SkeletonRect />
    <Row $alignItems="flex-start" $justifyContent="space-between" m="1rem 0 0 0" $gap="0.5rem">
      <Col $gap="1.5rem" $flex="0 1 100%" mw="1000px">
        <Col w="100%" $alignItems="flex-start" $gap="0.5rem">
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton />
        </Col>
        <Col w="100%" $alignItems="flex-start" $gap="0.5rem">
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton />
        </Col>
      </Col>
      <Col $flex="0 1 300px">
        <Row w="100%" $flexWrap="wrap" $gap="0.5rem" $justifyContent="flex-end">
          <SkeletonRect $w="80px" $h="60px" />
          <SkeletonRect $w="80px" $h="60px" />
          <SkeletonRect $w="80px" $h="60px" />
        </Row>
      </Col>
    </Row>
  </SkeletonContainer>
);

export default MovieSkeleton;
