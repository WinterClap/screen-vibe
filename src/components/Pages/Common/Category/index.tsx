import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTheme } from "styled-components";
import { IconContainer, StyledLink } from "../../../common";
import CategoryPageSkeleton from "./CategoryPageSkeleton";
import {
  CategoryContainer,
  CategoryHeader,
  CategorySliderContainer,
  HandleContainer,
  HeaderText,
  SliderWrapper,
} from "./styles";
import type { PopularMovieDetails } from "../../../../../pages/api/movie/popular";
import CategoryItem from "./CategoryItem";

type Props = {
  data: PopularMovieDetails | undefined;
  title: string;
  isLoading: boolean;
  seeMoreHref?: string;
  size?: "normal" | "small";
};

const Category = ({ data, isLoading, seeMoreHref, title, size }: Props) => {
  const [page, setPage] = React.useState<number>(1);
  console.log(page);
  console.log("DATA: ", data);
  const theme = useTheme();

  const handleButton = (isNext: boolean) => {
    const ITEMS_PER_PAGE = 2;
    const dataLength = data?.results.length;
    if (isNext) {
      if (dataLength !== undefined && page !== Math.floor(dataLength / ITEMS_PER_PAGE)) {
        setPage((prev) => prev + 1);
        return;
      }
      setPage(1);
      return;
    }

    if (dataLength !== undefined && page !== 1) {
      setPage((prev) => prev - 1);
      return;
    }
    dataLength !== undefined && setPage(Math.floor(dataLength / ITEMS_PER_PAGE));
  };

  if (data === undefined && !isLoading) return null;

  return (
    <CategoryContainer>
      <CategoryHeader>
        <HeaderText>{title}</HeaderText>
        {seeMoreHref && !isLoading && (
          <StyledLink
            $h="100%"
            $hoverColor={theme.dimmedText}
            $mobileL="font-size: 0.6rem"
            $withOutline
            $fontSize="0.8rem"
            $fontWeight="600"
            $d="flex"
            href={seeMoreHref}
          >
            See more
            <IconContainer cursor="pointer" color="inherit">
              <IoChevronForward size={"1rem"} />
            </IconContainer>
          </StyledLink>
        )}
      </CategoryHeader>
      {isLoading ? (
        <CategoryPageSkeleton size={size} />
      ) : (
        <SliderWrapper>
          <HandleContainer whileTap={{ scale: 0.95 }} onClick={() => handleButton(false)}>
            <IoChevronBack size={24} color={theme.white} />
          </HandleContainer>
          <CategorySliderContainer $x={`-${(page - 1) * 100}%`}>
            {data?.results.map((result) => (
              <CategoryItem
                key={result.id}
                imageBackdropSrc={result.backdrop_path}
                originalTitle={result.title}
                releaseDate={result.release_date}
                mediaType="movie"
                mediaId={result.id}
              />
            ))}
          </CategorySliderContainer>
          <HandleContainer whileTap={{ scale: 0.95 }} onClick={() => handleButton(true)}>
            <IoChevronForward size={24} color={theme.white} />
          </HandleContainer>
        </SliderWrapper>
      )}
    </CategoryContainer>
  );
};

export default Category;
