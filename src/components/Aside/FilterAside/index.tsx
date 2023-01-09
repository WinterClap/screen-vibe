import React from "react";
import { useSelector } from "react-redux";
import { useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Aside } from "../../../layouts/Main/styles";
import { RootState } from "../../../store";
import AsideMenu from "../AsideMenu";
import LoginModal from "../NavigationAside/Modals/LoginModal";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import Content from "./Content";
import useAuthWithSession from "../../../hooks/useAuthWithSession";

type FilterAsideProps = {};

const FilterAside = ({}: FilterAsideProps) => {
  console.log("Filter Aside component render!");
  const shouldShowLoginModal = useSelector((state: RootState) => state.general.shouldShowLoginModal);
  const [isAsideOpen, setIsAsideOpen] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const onOpaqueAreaClick = () => {
    setIsAsideOpen(false);
  };

  const xMov = useMotionValue(0);
  const opacity = useTransform(xMov, [250, 0], [0, 1]);

  useAuthWithSession();

  return (
    <Aside>
      <Content />
      <AsideMenu filterAside onClick={onToggleMenu} />
      <AnimatePresence>
        {isAsideOpen && (
          <AsideDrawerContainer $inverse>
            <Aside
              $isDynamic
              key="dynamic-filter-aside"
              style={{ x: xMov, originX: 1 }}
              initial={{ x: 250 }}
              animate={{ x: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ x: 250, transition: { duration: 0.5, ease: "easeInOut" } }}
            >
              <Content requestCloseAside={onOpaqueAreaClick} isVisible />
            </Aside>
            <AsideOpaqueBackground style={{ opacity }} onClick={onOpaqueAreaClick} />
          </AsideDrawerContainer>
        )}
        {shouldShowLoginModal && <LoginModal key="login-modal-presence-key" />}
      </AnimatePresence>
    </Aside>
  );
};

export default FilterAside;
