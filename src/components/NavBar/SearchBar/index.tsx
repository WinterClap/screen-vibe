import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { ResultContainer, SearchBarContainer, SearchBarInput, SearchBarWrapper } from "./styles";
import { AnimatePresence } from "framer-motion";
import ResultBox from "./ResultBox";
import { useQuery } from "react-query";
import { getMultiSearch } from "../../../utils/api/multi_search";

type Props = {
  isMobile?: boolean;
};

const SearchBar = ({ isMobile }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDropdownVisible, setIsDropdownvisible] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const { accountDetails, isLoggedIn } = useSelector((state: RootState) => state.user);
  const include_adult = isLoggedIn && accountDetails?.include_adult;
  const locale = useSelector((state: RootState) => state.general.locale);
  const MIN_QUERY_LENTGH = 3;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["test", query],
    queryFn: () => getMultiSearch({ include_adult: !!include_adult, locale, query }),
    staleTime: Infinity,
    enabled: !!locale && query.length >= MIN_QUERY_LENTGH,
  });

  const onInputBlur = () => {
    console.log("blur");
    setIsDropdownvisible(false);
  };
  const onInputFocus = () => {
    console.log("focus");
    setIsDropdownvisible(true);
  };
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    console.log("query: ", query);
  };
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape" && query.length === 0) {
      inputRef.current?.blur();
    }
  };

  return (
    <SearchBarWrapper
      $isMobile={isMobile}
      initial={{ width: "fit-content" }}
      animate={{ width: isDropdownVisible ? "100%" : "fit-content" }}
    >
      <SearchBarContainer tabIndex={-1} $isActive={isDropdownVisible}>
        <SearchBarInput
          ref={inputRef}
          type="search"
          placeholder="Search movies, tv, people..."
          value={query}
          role="combobox"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          autoComplete="off"
          aria-expanded={isDropdownVisible}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
      </SearchBarContainer>
      <AnimatePresence>
        {isDropdownVisible && (
          <ResultContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultBox query={query} data={data} isError={isError} isLoading={isLoading} />
          </ResultContainer>
        )}
      </AnimatePresence>
    </SearchBarWrapper>
  );
};

export default SearchBar;
