import React from "react";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import { Col } from "../../../common";
import NoDataError from "../Category/ErrorPlaceholder/NoDataError";
import PageNavigator from "../PageNavigator";
import SubcategoryItem from "./SubcategoryItem";
import SubcategoryItemCard from "./SubcategoryItemCard";
import {
  SubcategoryPageTitle,
  SubcategoryContainer,
  SubcategoryItemCardBackdrop,
  SubcategoryItemContainerSkeleton,
  SubcategoryItemSkeleton,
  SubcategoryItemTextSkeleton,
} from "./styles";
import useSubcategoryTvContent from "../../../../hooks/useSubcategoryTvContent";
import type { UseQueryOptions } from "react-query";
import { getPopularTv } from "../../../../utils/api/tv";

type Props = {
  pathname: string;
  partialQueryKey: UseQueryOptions["queryKey"];
  queryFn: typeof getPopularTv;
  pageTitle?: string;
};

const SubcategoryPageTvContent = ({ pathname, pageTitle, partialQueryKey, queryFn }: Props) => {
  const {
    page,
    selectedItem,
    data,
    isError,
    isLoading,
    handleSelectedItem,
    onBackdropClick,
    onNextClick,
    onPageClick,
    onPreviousClick,
    onGoBackClick,
  } = useSubcategoryTvContent({ pathname, partialQueryKey, queryFn });

  const skeletons = new Array(6).fill(undefined);

  return (
    <>
      <SubcategoryPageTitle>{pageTitle}</SubcategoryPageTitle>
      <LayoutGroup>
        <SubcategoryContainer>
          {!isLoading &&
            !isError &&
            data?.results.map((result) => (
              <SubcategoryItem
                // layoutId={`${result.id}`}
                mediaType="tv"
                key={result.id}
                id={result.id}
                title={result.name}
                posterPath={result.poster_path}
                backdropPath={result.backdrop_path}
                genreIds={result.genre_ids}
                overview={result.overview}
                releaseDate={result.first_air_date}
                voteAvg={result.vote_average}
                voteCount={result.vote_count}
                handleSelectedItem={handleSelectedItem}
              />
            ))}
          <AnimatePresence>
            {selectedItem && (
              <SubcategoryItemCardBackdrop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                tabIndex={-1}
                onClick={onBackdropClick}
                key="card-backdrop"
              >
                <SubcategoryItemCard
                  key={selectedItem.id}
                  id={selectedItem.id}
                  mediaType="tv"
                  // layoutId={`${selectedItem.id}`}
                  title={selectedItem.title}
                  posterPath={selectedItem.posterPath}
                  backdropPath={selectedItem.backdropPath}
                  genreIds={selectedItem.genreIds}
                  overview={selectedItem.overview}
                  releaseDate={selectedItem.releaseDate}
                  voteAvg={selectedItem.voteAvg}
                  voteCount={selectedItem.voteCount}
                  handleDismiss={() => handleSelectedItem(null)}
                />
              </SubcategoryItemCardBackdrop>
            )}
          </AnimatePresence>
          {isLoading ? (
            <>
              {skeletons.map((_, idx) => (
                <SubcategoryItemContainerSkeleton key={idx}>
                  <SubcategoryItemSkeleton />
                  <Col $gap="3px" $alignItems="flex-start">
                    <SubcategoryItemTextSkeleton />
                    <SubcategoryItemTextSkeleton />
                    <SubcategoryItemTextSkeleton />
                  </Col>
                </SubcategoryItemContainerSkeleton>
              ))}
            </>
          ) : null}
          {isError && <NoDataError onGoBackClick={onGoBackClick} />}
        </SubcategoryContainer>
        {data?.total_pages && page && (
          <PageNavigator
            currentPage={page}
            totalPages={data.total_pages}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            onPageClick={onPageClick}
          />
        )}
      </LayoutGroup>
    </>
  );
};

export default SubcategoryPageTvContent;
