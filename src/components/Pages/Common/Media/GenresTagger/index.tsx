import React from "react";
import { Row } from "../../../../common";
import { GenreTag } from "../styles";

type Props = {
  genres: {
    id: number;
    name: string;
  }[];
};

const GenresTagger = ({ genres }: Props) => {
  return (
    <Row $gap="0.25rem" $justifyContent="flex-start" m="0.5rem 0" $flexWrap="wrap">
      {genres.map((genre) => (
        <GenreTag key={genre.id}>{genre.name}</GenreTag>
      ))}
    </Row>
  );
};

export default GenresTagger;
