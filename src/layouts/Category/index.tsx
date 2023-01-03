import React, { PropsWithChildren } from "react";
import NavBar from "../../components/NavBar";
import { PageContainer } from "./styles";

const CategoryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <PageContainer>{children}</PageContainer>
    </>
  );
};

export default CategoryLayout;
