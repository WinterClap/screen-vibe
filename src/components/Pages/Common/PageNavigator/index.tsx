import React from "react";
import { Row } from "../../../common";
import { Divider, PaginatorButton } from "./styles";

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
  buttonSpreadQuantity = 4,
  buttonSpreadThreshold = 5,
  currentPage,
  totalPages,
  onPageClick,
}: Props) => {
  if (totalPages === 1) return null;

  return (
    <Row $gap="1rem" p="1rem 0rem">
      <PaginatorButton disabled={currentPage === 1} onClick={onPreviousClick}>
        Previous
      </PaginatorButton>
      <Row $gap="0.5rem">
        {currentPage > buttonSpreadQuantity / 2 && (
          <>
            <PaginatorButton isIndicator onClick={() => onPageClick(1)}>
              1
            </PaginatorButton>
            <Divider>...</Divider>
          </>
        )}
        {totalPages <= buttonSpreadThreshold
          ? new Array(totalPages).fill(undefined).map((_, idx) => (
              <PaginatorButton isIndicator isFocused={idx + 1 === currentPage} key={idx}>
                {idx}
              </PaginatorButton>
            ))
          : currentPage === totalPages
          ? new Array(buttonSpreadQuantity).fill(undefined).map((_, idx) => {
              const pageNumber = totalPages - buttonSpreadQuantity + 1 + idx;

              return (
                <PaginatorButton
                  key={idx}
                  isIndicator
                  isFocused={idx === buttonSpreadQuantity - 1}
                  onClick={() => onPageClick(pageNumber)}
                >
                  {pageNumber}
                </PaginatorButton>
              );
            })
          : new Array(buttonSpreadQuantity).fill(-(buttonSpreadQuantity / 2)).map((curr, idx) => {
              const pageNumber =
                (currentPage > buttonSpreadQuantity / 2 && currentPage + curr + idx) || currentPage + idx;

              return (
                <PaginatorButton
                  key={idx}
                  isIndicator
                  isFocused={currentPage > buttonSpreadQuantity / 2 ? idx === buttonSpreadQuantity / 2 : idx === 0}
                  onClick={() => onPageClick(pageNumber)}
                >
                  {pageNumber}
                </PaginatorButton>
              );
            })}
        {currentPage < totalPages - 1 && (
          <>
            <Divider>...</Divider>
            <PaginatorButton isIndicator onClick={() => onPageClick(totalPages)}>
              {totalPages}
            </PaginatorButton>
          </>
        )}
      </Row>
      <PaginatorButton disabled={currentPage === totalPages} onClick={onNextClick}>
        Next
      </PaginatorButton>
    </Row>
  );
};

export default PageNavigator;
