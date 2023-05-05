import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { Button, Col, IconContainer } from "../../../../common";
import { NoDataErrorContainer } from "./styles";

type Props = {
  onGoBackClick?: () => void;
};

const NoDataError = ({ onGoBackClick }: Props) => {
  return (
    <NoDataErrorContainer>
      <Col $gap="1rem">
        <p>No data</p>
        <IconContainer className="icon">
          <HiOutlineArchiveBoxXMark size="5rem" />
        </IconContainer>
        {onGoBackClick && (
          <Button onClick={onGoBackClick} $secondary>
            Go back
          </Button>
        )}
      </Col>
    </NoDataErrorContainer>
  );
};

export default NoDataError;
