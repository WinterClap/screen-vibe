import React from "react";
import type { GenreList } from "../../../../../pages/api/genre/movie/list";
import { StyledLink } from "../../../common";
import BoxSkeleton from "./BoxSkeleton";
import { GenreLink, SubcategorySideBarHeader, SubcategorySideBarSection } from "./styles";

type Props = {
  genres: GenreList["genres"] | undefined;
  isLoading: boolean;
};

const GenresBox = ({ genres, isLoading }: Props) => {
  return (
    <SubcategorySideBarSection>
      <SubcategorySideBarHeader>Genres</SubcategorySideBarHeader>
      {isLoading ? (
        <BoxSkeleton />
      ) : (
        <>
          {genres?.map((genre, idx) => (
            <React.Fragment key={genre.id}>
              <GenreLink>
                <StyledLink href={`/search/genre/${genre.id}`}>{genre.name}</StyledLink>
              </GenreLink>
              <span>{idx !== genres.length - 1 && ", "}</span>
            </React.Fragment>
          ))}
        </>
      )}
    </SubcategorySideBarSection>
  );
};

export default GenresBox;
