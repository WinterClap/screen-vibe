import React, { PropsWithChildren } from "react";
import FilterAside from "../../components/Aside/FilterAside";
import NavigationAside from "../../components/Aside/NavigationAside";
import SplashScreen from "../../components/SplashScreen";
import ToastMessage from "../../components/Toast/ToastMessage";
import { CentralContent, Container } from "./styles";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ToastMessage />
      <SplashScreen />
      <Container>
        <NavigationAside />
        <CentralContent>{children}</CentralContent>
        <FilterAside />
      </Container>
    </>
  );
};

export default MainLayout;
