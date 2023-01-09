import React from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Aside } from "../../../layouts/Main/styles";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import AsideMenu from "../AsideMenu";
import Content from "./Content";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import PreferencesModal from "./Modals/PreferencesModal";
import { setShouldShowPreferencesModal } from "../../../slices/generalSlice";
import type { BottomItems } from "./constants";
import { setShouldShowLogoutModal } from "../../../slices/userSlice";
import LogoutModal from "./Modals/LogoutModal";

const NavigationHeader = () => {
  const dispatch = useDispatch();
  const shouldShowPreferencesModal = useSelector((state: RootState) => state.general.shouldShowPreferencesModal);
  const shouldShowLogoutModal = useSelector((state: RootState) => state.user.shouldShowLogoutModal);
  const [focusedItem, setFocusedItem] = React.useState<string | null>(null);
  const [isAsideOpen, setIsAsideOpen] = React.useState<boolean>(false);

  const onMouseEnter = (name: string) => {
    setFocusedItem(name);
  };

  const onMouseLeave = () => {
    setFocusedItem(null);
  };

  const onToggleMenu = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const onClick = (name: BottomItems[number]["name"]) => {
    switch (name) {
      case "Settings":
        dispatch(setShouldShowPreferencesModal(true));
        break;
      case "Logout":
        dispatch(setShouldShowLogoutModal(true));
        break;
      default:
        break;
    }

    setIsAsideOpen(false);
  };

  const onRequestCloseDynamicAside: (event: KeyboardEvent) => void | React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((event) => {
      if (event.key === "Escape") {
        setIsAsideOpen(false);
      }
    }, []);

  const onOpaqueAreaClick = () => {
    setIsAsideOpen(false);
  };

  const xMov = useMotionValue(0);
  const opacity = useTransform(xMov, [-250, 0], [0, 1]);

  return (
    <Aside onMouseLeave={onMouseLeave}>
      <Content onClick={onClick} onToggleMenu={onToggleMenu} onMouseEnter={onMouseEnter} focusedItem={focusedItem} />
      <AsideMenu onClick={onToggleMenu} />
      <AnimatePresence>
        {isAsideOpen && (
          <AsideDrawerContainer key="aside-drawer-container">
            <Aside
              $isDynamic
              key="dynamic-navigation-aside"
              style={{ x: xMov }}
              initial={{ x: -250 }}
              animate={{ x: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ x: -250, transition: { duration: 0.5, ease: "easeInOut" } }}
              onMouseLeave={onMouseLeave}
            >
              <Content
                onClick={onClick}
                onToggleMenu={onToggleMenu}
                onMouseEnter={onMouseEnter}
                isVisible={isAsideOpen}
                focusedItem={focusedItem}
                onRequestCloseDynamicAside={onRequestCloseDynamicAside}
              />
            </Aside>
            <AsideOpaqueBackground style={{ opacity }} onClick={onOpaqueAreaClick} />
          </AsideDrawerContainer>
        )}
        {shouldShowPreferencesModal && <PreferencesModal key="preferences-modal" />}
        {shouldShowLogoutModal && <LogoutModal key="logout-modal" />}
      </AnimatePresence>
    </Aside>
  );
};

export default NavigationHeader;
