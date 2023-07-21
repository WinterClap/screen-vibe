import TvContent from "../../../src/components/Pages/Tv/Content";
import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { NextPageWithLayout } from "../../_app";

const SeriesPage: NextPageWithLayout = () => {
  return <TvContent />;
};

SeriesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default SeriesPage;
