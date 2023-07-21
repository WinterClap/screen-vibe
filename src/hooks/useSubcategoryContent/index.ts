import React from "react";
import { useRouter } from "next/router";
import { UseQueryOptions, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { SubcategoryItemProps } from "../../components/Pages/Common/Subcategory/SubcategoryItem";
import { setToastData } from "../../slices/toastMessageSlice";
import type { RootState } from "../../store";
import { getFavoriteMovies, getPopularMovies } from "../../utils/api/movie";
import type { AccountMoviesFavoritesDetails } from "../../../pages/api/account/favorite";
import type { PopularMovieDetails } from "../../../pages/api/movie/popular";
import { getSessionIdFromLocalStorage } from "../../utils";

type HookParameters = {
  pathname: string;
  partialQueryKey: UseQueryOptions["queryKey"];
  queryFn: typeof getPopularMovies | typeof getFavoriteMovies;
  shouldUseFavWatchlist?: boolean;
};

const useSubcategoryPageContent = ({ pathname, partialQueryKey, shouldUseFavWatchlist, queryFn }: HookParameters) => {
  const { query, push, isReady } = useRouter();
  const [page, setPage] = React.useState<number | undefined>(undefined);
  const locale = useSelector((state: RootState) => state.general.locale);
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);
  const session_id = getSessionIdFromLocalStorage();
  const { data, isLoading, isError } = useQuery<PopularMovieDetails | AccountMoviesFavoritesDetails | undefined>({
    queryKey: [partialQueryKey, page],
    onError: () =>
      dispatch(
        setToastData({ content: "Sorry, we encountered an error trying to get the lastest data.", icon: "danger" })
      ),
    queryFn: () => {
      if (shouldUseFavWatchlist) {
        return queryFn({ account_id: accountDetails?.id || 0, locale, session_id, sort_by: "created_at.desc", page });
      } else if (shouldUseFavWatchlist === false || shouldUseFavWatchlist === undefined) {
        return queryFn({ locale, page } as (typeof getPopularMovies)["arguments"]);
      }
    },
    enabled: shouldUseFavWatchlist
      ? !!locale && isReady && !!page && !!isLoggedIn && !!session_id
      : !!locale && isReady && !!page,
  });
  const [selectedItem, setSelectedItem] = React.useState<SubcategoryItemProps | null>(null);
  const dispatch = useDispatch();

  const handleSelectedItem = (item: SubcategoryItemProps | null) => {
    console.log("itemClicked -handle: ", item);
    setSelectedItem(item);
  };

  const onBackdropClick = () => {
    console.log("backdrop click");
    handleSelectedItem(null);
  };

  const onPreviousClick = () => {
    data && data.page - 1 >= 1 && setPage(data.page - 1);
  };

  const onNextClick = () => {
    data && data.page + 1 <= data.total_pages && setPage(data.page + 1);
  };

  const onPageClick = (page: number) => {
    setPage(page);
    console.log("page: ", page);
  };

  React.useEffect(() => {
    if (query.page === undefined && isReady) {
      push({ pathname, query: { page: 1 } });
      return;
    }
    const queryPage = parseInt(query.page as string);
    if (!isNaN(queryPage)) return setPage(queryPage);
  }, [query.page, isReady]);

  React.useEffect(() => {
    if (isReady && page) {
      push({ pathname, query: { page } });
    }
  }, [page, isReady]);

  const onGoBackClick = () => {
    push(pathname);
  };

  return {
    page,
    data,
    isError,
    isLoading,
    selectedItem,
    handleSelectedItem,
    onBackdropClick,
    onNextClick,
    onPreviousClick,
    onPageClick,
    onGoBackClick,
  };
};

export default useSubcategoryPageContent;
