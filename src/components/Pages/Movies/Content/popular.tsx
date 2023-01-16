import React from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { MOVIES_POPULAR_INFINITE } from "../../../../queryKeys";
import { getPopularMovies } from "../../../../utils/api/movie";
import { Col } from "../../../common";
import {
  SubcategoryContainer,
  SubcategoryItemContainerSkeleton,
  SubcategoryItemSkeleton,
  SubcategoryItemTextSkeleton,
  SubcategoryPageTitle,
} from "../../Common/Subcategory/styles";
import type { RootState } from "../../../../store";
import { setToastData } from "../../../../slices/toastMessageSlice";
import SubcategoryItem from "../../Common/Subcategory/SubcategoryItem";
import { AnimatePresence } from "framer-motion";
import SubcategoryItemCard from "../../Common/Subcategory/SubcategoryItemCard";

type Props = {};

const MoviesPopularContent = (props: Props) => {
  const [selectedItem, setSelectedItem] = React.useState<unknown | null>(null);
  const locale = useSelector((state: RootState) => state.general.locale);
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  const skeletons = new Array(6).fill(undefined);

  const handleSelectedItem = (item: unknown) => {
    console.log("itemClicked: ", item);
    setSelectedItem(item);
  };

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

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page!!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <SubcategoryPageTitle>Popular Movies</SubcategoryPageTitle>
      <SubcategoryContainer>
        {!isLoading &&
          !isError &&
          data?.pages.map((page) =>
            page?.results.map((result) => (
              <SubcategoryItem
                isSelected={selectedItem?.id === result.id}
                // layoutId={`${result.id}`}
                key={result.id}
                id={result.id}
                title={result.title}
                posterPath={result.poster_path}
                backdropPath={result.backdrop_path}
                genreIds={result.genre_ids}
                overview={result.overview}
                releaseDate={result.release_date}
                handleSelectedItem={handleSelectedItem}
              />
            ))
          )}
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
    </>
  );
};

export default MoviesPopularContent;
