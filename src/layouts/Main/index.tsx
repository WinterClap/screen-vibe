import React, { PropsWithChildren } from "react";
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
      </Container>
    </>
  );
};

export default MainLayout;
