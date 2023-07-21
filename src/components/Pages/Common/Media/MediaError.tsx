import React from "react";
import { Button, Row } from "../../../common";
import { useRouter } from "next/router";
import { ErrorBody, ErrorContainer, ErrorDimmedText, ErrorHeader, ErrorHeaderContainer } from "./styles";
import { MdOutlineError } from "react-icons/md";
import { useTheme } from "styled-components";

type Props = {
  mediaType: "movie" | "tv";
};

const MediaError = ({ mediaType }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const onGoBackClick = () => {
    mediaType === "movie" ? router.push("/category/movies") : router.push("/category/tv");
  };

  const mediaName = mediaType === "movie" ? "Movie" : "Tv show";

  return (
    <ErrorContainer>
      <ErrorHeaderContainer>
        <MdOutlineError color={theme.white} size={28} />
        <ErrorHeader>Oops!</ErrorHeader>
      </ErrorHeaderContainer>
      <ErrorBody>
        <Row m="0 0 2rem 0">
          <ErrorDimmedText>An error ocurred trying to get this {mediaName} info. Try again later.</ErrorDimmedText>
        </Row>
        <Button onClick={onGoBackClick} $extended>
          Go back
        </Button>
      </ErrorBody>
    </ErrorContainer>
  );
};

export default MediaError;
