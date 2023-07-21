import React from "react";
import { Row } from "../../../common";
import { Divider, PaginatorButton } from "./styles";
import { usePagination, DOTS } from "../../../../hooks/usePagination";

type Props = {
  totalPages: number;
  currentPage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onPageClick: (page: number) => void;
  buttonSpreadThreshold?: number;
  buttonSpreadQuantity?: number;
};

const PageNavigator = ({
  onNextClick,
  onPreviousClick,
  buttonSpreadQuantity = 1,
  buttonSpreadThreshold = 5,
  currentPage,
  totalPages,
  onPageClick,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount: buttonSpreadQuantity,
    buttonSpreadThreshold,
    totalPages,
  });
  if (totalPages === 1) return null;

  return (
    <Row $gap="1rem" p="1rem 0rem">
      <PaginatorButton disabled={currentPage === 1} onClick={onPreviousClick}>
        Previous
      </PaginatorButton>
      <Row $gap="0.5rem">
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return <Divider key={DOTS + idx.toString()}>...</Divider>;
          }

          return (
            <PaginatorButton
              onClick={() => onPageClick(pageNumber as number)}
              key={pageNumber}
              isIndicator
              isFocused={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginatorButton>
          );
        })}
      </Row>
      <PaginatorButton disabled={currentPage === totalPages} onClick={onNextClick}>
        Next
      </PaginatorButton>
    </Row>
  );
};

export default PageNavigator;
