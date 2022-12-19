import CategoryLayout from "../../../src/layouts/Category";
import MainLayout from "../../../src/layouts/Main";
import { NextPageWithLayout } from "../../_app";

const SeriesPage: NextPageWithLayout = () => {
  return <div>Series Page</div>;
};

SeriesPage.getLayout = (page) => {
  return (
    <MainLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </MainLayout>
  );
};

export default SeriesPage;
