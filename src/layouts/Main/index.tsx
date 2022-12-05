import React, { PropsWithChildren } from "react";
import NavigationAside from "../../components/Aside/NavigationAside";
import { Aside, CentralContent, Container } from "./stlyes";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <NavigationAside></NavigationAside>
      <CentralContent>{children}</CentralContent>
      <Aside>RIGHT</Aside>
    </Container>
  );
};

export default MainLayout;
