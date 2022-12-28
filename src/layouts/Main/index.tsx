import React, { PropsWithChildren } from "react";
import FilterAside from "../../components/Aside/FilterAside";
import NavigationAside from "../../components/Aside/NavigationAside";
import SplashScreen from "../../components/SplashScreen";
import { CentralContent, Container } from "./stlyes";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SplashScreen />
      <Container>
        <NavigationAside></NavigationAside>
        <CentralContent>{children}</CentralContent>
        <FilterAside></FilterAside>
      </Container>
    </>
  );
};

export default MainLayout;
