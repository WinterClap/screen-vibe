import React from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { MOVIES_POPULAR_INFINITE } from "../../../../queryKeys";
import { getPopularMovies } from "../../../../utils/api/movie";
import { Col } from "../../../common";
import {
  SubcategoryContainer,
  SubcategoryItemCardBackdrop,
  SubcategoryItemContainerSkeleton,
  SubcategoryItemSkeleton,
  SubcategoryItemTextSkeleton,
  SubcategoryPageTitle,
} from "../../Common/Subcategory/styles";
import type { RootState } from "../../../../store";
import { setToastData } from "../../../../slices/toastMessageSlice";
import SubcategoryItem, { SubcategoryItemProps } from "../../Common/Subcategory/SubcategoryItem";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import SubcategoryItemCard from "../../Common/Subcategory/SubcategoryItemCard";

type Props = {};

const MoviesPopularContent = (props: Props) => {
  const locale = useSelector((state: RootState) => state.general.locale);
  const { data, isLoading, isFetchingNextPage, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: MOVIES_POPULAR_INFINITE,
    onError: () =>
      dispatch(
        setToastData({ content: "Sorry, we encountered an error trying to get the lastest data.", icon: "danger" })
      ),
    queryFn: ({ pageParam = 1 }) => getPopularMovies({ locale, page: pageParam }),
    getNextPageParam: (data) => (data && data.page + 1 <= data?.total_pages ? data.page + 1 : undefined),
    enabled: !!locale,
  });
  const [selectedItem, setSelectedItem] = React.useState<SubcategoryItemProps | null>(null);
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  const skeletons = new Array(6).fill(undefined);

  const handleSelectedItem = (item: SubcategoryItemProps | null) => {
    console.log("itemClicked -handle: ", item);
    setSelectedItem(item);
  };

  const onBackdropClick = () => {
    console.log("backdrop click");
    handleSelectedItem(null);
  };

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page!!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <SubcategoryPageTitle>Popular Movies</SubcategoryPageTitle>
      <LayoutGroup>
        <SubcategoryContainer>
          {!isLoading &&
            !isError &&
            data?.pages.map((page) =>
              page?.results.map((result) => (
                <SubcategoryItem
                  // layoutId={`${result.id}`}
                  key={result.id}
                  id={result.id}
                  title={result.title}
                  posterPath={result.poster_path}
                  backdropPath={result.backdrop_path}
                  genreIds={result.genre_ids}
                  overview={result.overview}
                  releaseDate={result.release_date}
                  voteAvg={result.vote_average}
                  voteCount={result.vote_count}
                  handleSelectedItem={handleSelectedItem}
                />
              ))
            )}
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
                  id={selectedItem.id}
                  // layoutId={`${selectedItem.id}`}
                  key={selectedItem.id}
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
          {isLoading || isFetchingNextPage ? (
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
          <div ref={ref} style={{ height: 40, width: "100%" }} />
        </SubcategoryContainer>
      </LayoutGroup>
    </>
  );
};

export default MoviesPopularContent;
