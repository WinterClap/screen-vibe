import React from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import TvContent from "../../src/components/Pages/Common/Media/Tv/Content";
import MainLayout from "../../src/layouts/Main";
import CategoryLayout from "../../src/layouts/Category";
import MediaError from "../../src/components/Pages/Common/Media/MediaError";

type Props = {};

const TvPage: NextPageWithLayout = (props: Props) => {
  const { query, isReady } = useRouter();
  const tvId = (query.id && parseInt(query.id as string)) || undefined;

  if (isReady && !tvId) {
    return <MediaError mediaType="tv" />;
  }

  if (!tvId) {
    return null;
  }

  return <TvContent id={tvId} />;
};

TvPage.getLayout = (page) => (
  <MainLayout>
    <CategoryLayout>{page}</CategoryLayout>
  </MainLayout>
);

export default TvPage;
