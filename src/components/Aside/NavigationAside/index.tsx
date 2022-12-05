import React from "react";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Aside } from "../../../layouts/Main/stlyes";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import AsideMenu from "../AsideMenu";
import Content from "./Content";

const NavigationHeader = () => {
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

  const onRequestCloseDynamicAside: (event: KeyboardEvent) => void | React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((event) => {
      if (event.key === "Escape") {
        setIsAsideOpen(false);
      }
    }, []);

  const xMov = useMotionValue(0);
  const opacity = useTransform(xMov, [-250, 0], [0, 1]);

  return (
    <Aside onMouseLeave={onMouseLeave}>
      <Content onToggleMenu={onToggleMenu} onMouseEnter={onMouseEnter} focusedItem={focusedItem} />
      <AsideMenu onClick={onToggleMenu} />
      <AnimatePresence>
        {isAsideOpen && (
          <AsideDrawerContainer>
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
                onToggleMenu={onToggleMenu}
                onMouseEnter={onMouseEnter}
                isVisible={isAsideOpen}
                focusedItem={focusedItem}
                onRequestCloseDynamicAside={onRequestCloseDynamicAside}
              />
            </Aside>
            <AsideOpaqueBackground
              style={{ opacity }}
              onClick={onRequestCloseDynamicAside as unknown as React.MouseEventHandler<HTMLDivElement>}
            />
          </AsideDrawerContainer>
        )}
      </AnimatePresence>
    </Aside>
  );
};

export default NavigationHeader;
