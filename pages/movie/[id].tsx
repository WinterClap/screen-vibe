import React from "react";
import MovieContent from "../../src/components/Pages/Common/Media/Movie/Content";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import MainLayout from "../../src/layouts/Main";
import CategoryLayout from "../../src/layouts/Category";
import MediaError from "../../src/components/Pages/Common/Media/MediaError";

type Props = {};

const MoviePage: NextPageWithLayout = (props: Props) => {
  const { query, isReady } = useRouter();
  const movieId = (query.id && parseInt(query.id as string)) || undefined;

  if (isReady && !movieId) {
    return <MediaError mediaType="movie" />;
  }

  if (!movieId) {
    return null;
  }

  return <MovieContent id={movieId} />;
};

MoviePage.getLayout = (page) => (
  <MainLayout>
    <CategoryLayout>{page}</CategoryLayout>
  </MainLayout>
);

export default MoviePage;
