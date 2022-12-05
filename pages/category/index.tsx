import React from "react";
import CategoryLayout from "../../src/layouts/Category";
import { NextPageWithLayout } from "../_app";

const CategoryPage: NextPageWithLayout = () => {
  return <div>CategoryPage</div>;
};

CategoryPage.getLayout = (page) => {
  return <CategoryLayout>{page}</CategoryLayout>;
};

export default CategoryPage;
