import React from "react";
import { useSelector } from "react-redux";
import AccordionItem from "./AccordionItem";
import type { RootState } from "../../../../store";
import { DimmedItemDescription } from "./styles";
import useWatchlist from "../../../../hooks/useWatchlist";
import useFavorites from "../../../../hooks/useFavorites";

type Props = {};

const ListsAccordion = (props: Props) => {
  const [options, setOptions] = React.useState<Record<"watchlist" | "favorites", number>>({
    watchlist: 0,
    favorites: 0,
  });
  const locale = useSelector((state: RootState) => state.general.locale) as string;
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);
  const {
    isErrorMovies: isErrorMoviesWatchlist,
    isErrorTv: isErrorTvWatchlist,
    isLoadingMovies: isLoadingMoviesWatchlist,
    isLoadingTv: isLoadingTvWatchlist,
    moviesData: moviesDataWatchlist,
    tvData: tvDataWatchlist,
    removeFromWatchlist,
  } = useWatchlist({
    account_id: accountDetails?.id || 0,
    locale,
    mediaType: options.watchlist === 0 ? "movies" : "tv",
    sort_by: "created_at.desc",
  });

  const {
    isErrorMovies: isErrorMoviesFavorites,
    isErrorTv: isErrorTvFavorites,
    isLoadingMovies: isLoadingMoviesFavorites,
    isLoadingTv: isLoadingTvFavorites,
    moviesData: moviesDataFavorites,
    tvData: tvDataFavorites,
    removeFromFavorites,
  } = useFavorites({
    account_id: accountDetails?.id || 0,
    locale,
    mediaType: options.favorites === 0 ? "movies" : "tv",
    sort_by: "created_at.desc",
  });

  const onSelectedIndex = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, idx: number) => {
    setOptions((prev) => ({ ...prev, [id]: idx }));
    event.stopPropagation();
  };

  return (
    <>
      <DimmedItemDescription $alignSelf="flex-start">
        {isLoggedIn ? "Your Quick Access lists:" : "Login to keep track of your favorite lists!"}
      </DimmedItemDescription>
      <AccordionItem
        id="watchlist"
        selectedIndex={options["watchlist"]}
        label="Watchlist"
        mediaOptions={["Movies", "TV"]}
        seeMoreHref="/watchlist"
        openByDefault
        onSelectedIndex={onSelectedIndex}
        isLoggedIn={isLoggedIn}
        removeFromWatchlist={removeFromWatchlist}
        data={options.watchlist === 0 ? moviesDataWatchlist : tvDataWatchlist}
        isError={options.watchlist === 0 ? isErrorMoviesWatchlist : isErrorTvWatchlist}
        isLoading={options.watchlist === 0 ? isLoadingMoviesWatchlist : isLoadingTvWatchlist}
      />
      <AccordionItem
        id="favorites"
        selectedIndex={options["favorites"]}
        label="Favorites"
        mediaOptions={["Movies", "TV"]}
        seeMoreHref="/favorites"
        onSelectedIndex={onSelectedIndex}
        isLoggedIn={isLoggedIn}
        removeFromFavorites={removeFromFavorites}
        data={options.favorites === 0 ? moviesDataFavorites : tvDataFavorites}
        isError={options.favorites === 0 ? isErrorMoviesFavorites : isErrorTvFavorites}
        isLoading={options.favorites === 0 ? isLoadingMoviesFavorites : isLoadingTvFavorites}
      />
    </>
  );
};

export default ListsAccordion;
