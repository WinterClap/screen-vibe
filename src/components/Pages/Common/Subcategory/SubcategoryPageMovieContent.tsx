import React from "react";
import { useQuery } from "react-query";

type Props = {
  query: Parameters<typeof useQuery>;
};

const SubcategoryPageContent = ({ query }: Props) => {
  return <div>SubcategoryPageContent</div>;
};

export default SubcategoryPageContent;
