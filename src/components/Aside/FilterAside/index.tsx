import { useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import React from "react";
import { Aside } from "../../../layouts/Main/stlyes";
import AsideMenu from "../AsideMenu";
import { AsideDrawerContainer, AsideOpaqueBackground } from "../styles";
import Content from "./Content";

type FilterAsideProps = {};

const FilterAside = ({}: FilterAsideProps) => {
  const [isAsideOpen, setIsAsideOpen] = React.useState<boolean>(false);

  const onToggleMenu = () => {
    setIsAsideOpen((prev) => !prev);
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
  const opacity = useTransform(xMov, [250, 0], [0, 1]);

  return (
    <Aside>
      <Content onToggleMenu={onToggleMenu} />
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
              <Content
                onToggleMenu={onToggleMenu}
                isVisible={isAsideOpen}
                onRequestCloseDynamicAside={onRequestCloseDynamicAside}
              />
            </Aside>
            <AsideOpaqueBackground style={{ opacity }} onClick={onOpaqueAreaClick} />
          </AsideDrawerContainer>
        )}
      </AnimatePresence>
    </Aside>
  );
};

export default FilterAside;
