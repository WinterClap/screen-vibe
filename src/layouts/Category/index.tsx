import React, { PropsWithChildren } from "react";
import NavBar from "../../components/NavBar";

const CategoryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default CategoryLayout;
