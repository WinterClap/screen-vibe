import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Aside } from "../../../layouts/Main/styles";
import { RootState } from "../../../store";
import AsideMenu from "../AsideMenu";
import LoginModal from "../NavigationAside/Modals/LoginModal";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import Content from "./Content";
import useAuthWithSession from "../../../hooks/useAuthWithSession";

type UserAsideProps = {};

const UserAside = ({}: UserAsideProps) => {
  console.log("Filter Aside component render!");
  const shouldShowLoginModal = useSelector((state: RootState) => state.general.shouldShowLoginModal);
  const [isAsideOpen, setIsAsideOpen] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const onOpaqueAreaClick = () => {
    setIsAsideOpen(false);
  };

  useAuthWithSession();

  return (
    <>
      <AsideMenu userAside onClick={onToggleMenu} />
      <AnimatePresence>
        {isAsideOpen && (
          <AsideDrawerContainer key="user-aside-drawer-container" $inverse>
            <Aside
              $isDynamic
              key="dynamic-user-aside"
              style={{ transformOrigin: "left top" }}
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ x: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
            >
              <Content requestCloseAside={onOpaqueAreaClick} isVisible />
            </Aside>
            <AsideOpaqueBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              onClick={onOpaqueAreaClick}
              key="user-aside-opaque-bg"
            />
          </AsideDrawerContainer>
        )}
        {shouldShowLoginModal && <LoginModal key="login-modal-presence-key" />}
      </AnimatePresence>
    </>
  );
};

export default UserAside;
