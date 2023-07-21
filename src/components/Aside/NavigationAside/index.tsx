import React from "react";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Aside } from "../../../layouts/Main/styles";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import AsideMenu from "../AsideMenu";
import Content from "./Content";
import PreferencesModal from "./Modals/PreferencesModal";
import { setShouldShowPreferencesModal } from "../../../slices/generalSlice";
import { setShouldShowLogoutModal } from "../../../slices/userSlice";
import LogoutModal from "./Modals/LogoutModal";
import type { BottomItems } from "./constants";
import type { RootState } from "../../../store";
import { getPxFromSize } from "../../../utils";
import { DEVICE_SIZES } from "../../../constants";

const NavigationHeader = () => {
  const dispatch = useDispatch();
  const shouldShowPreferencesModal = useSelector((state: RootState) => state.general.shouldShowPreferencesModal);
  const shouldShowLogoutModal = useSelector((state: RootState) => state.user.shouldShowLogoutModal);
  const [isAsideOpen, setIsAsideOpen] = React.useState<boolean>(false);
  const [isAsideCollapsed, setIsAsideCollapsed] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const onClick = (identifier: BottomItems[number]["identifier"]) => {
    switch (identifier) {
      case "settings":
        dispatch(setShouldShowPreferencesModal(true));
        break;
      case "log-out":
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

  const onCollapseAside = () => {
    setIsAsideCollapsed((prev) => !prev);
  };

  const xMov = useMotionValue(0);
  const opacity = useTransform(xMov, [-250, 0], [0, 1]);

  React.useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth <= getPxFromSize(DEVICE_SIZES.laptop)) {
        setIsAsideCollapsed(true);
      }
    };

    onWindowResize();

    window.addEventListener("resize", onWindowResize);
  }, []);

  return (
    <Aside
      $isAsideCollapsed={isAsideCollapsed}
      animate={{
        width: isAsideCollapsed ? 60 : 250,
        transition: { ease: "easeOut" },
      }}
    >
      <Content
        isCollapsed={isAsideCollapsed}
        onClick={onClick}
        onToggleMenu={onToggleMenu}
        onCollapseAside={onCollapseAside}
      />
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
            >
              <Content
                onClick={onClick}
                onToggleMenu={onToggleMenu}
                isVisible
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
