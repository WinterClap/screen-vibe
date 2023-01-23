import React from "react";
import { Col, Row } from "../../../common";
import { AverageRatingSkeletonContainer, RatingBoxSkeletonContainer, StarSkeleton } from "./styles";

const RatingBoxSkeleton = () => (
  <RatingBoxSkeletonContainer>
    <Col p="10px 0">
      <AverageRatingSkeletonContainer />
    </Col>
    <Row>
      {[...new Array(5)].map((_, idx) => (
        <StarSkeleton key={idx} />
      ))}
    </Row>
  </RatingBoxSkeletonContainer>
);

export default RatingBoxSkeleton;
