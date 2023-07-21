import React from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { AsideSection, LogoHeader, LogoSection } from "../../../layouts/Main/styles";
import AsideHeader from "../AsideHeader";
import AsideItem from "../AsideItem";
import AsideMenu from "../AsideMenu";
import { AsideContent, ItemsContainer } from "../styles";
import { getMenuItems, bottomItems, BottomItems, getLibraryMenuItems } from "./constants";
import { IconContainer } from "../../common";
import { useRouter } from "next/router";
import type { RootState } from "../../../store";
import {
  DefaultItemContent,
  DefaultItemContentPlaceholder,
  DimmedItemDescription,
  DimmedItemHeader,
} from "../UserAside/ListsAccordion/styles";

interface Props {
  onToggleMenu: () => void;
  onClick: (name: BottomItems[number]["identifier"]) => void;
  isVisible?: boolean;
  isCollapsed?: boolean;
  onCollapseAside?: () => void;
  onRequestCloseDynamicAside?: (event: KeyboardEvent) => void;
}

const Content: React.FC<Props> = ({
  onToggleMenu,
  onClick,
  onRequestCloseDynamicAside,
  onCollapseAside,
  isCollapsed,
  isVisible,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const theme = useTheme();
  const { pathname } = useRouter();
  const menuItems = getMenuItems(pathname.includes("/category/movies") ? "movies" : "tv");
  const libraryMenuItems = getLibraryMenuItems(pathname.includes("/category/movies") ? "movies" : "tv");

  React.useEffect(() => {
    if (!onRequestCloseDynamicAside) {
      return;
    }
    window.addEventListener("keydown", onRequestCloseDynamicAside);
    return () => window.removeEventListener("keydown", onRequestCloseDynamicAside);
  }, [onRequestCloseDynamicAside]);

  const onCollapseAsideButtonKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === " " || e.key === "Enter") {
      onCollapseAside?.();
    }
  };

  if (isCollapsed)
    return (
      <AsideContent>
        <AsideSection>
          <LogoHeader $collapsed>
            <RiMovie2Fill size={40} title="ScreenVibe" color={theme.primary} />
          </LogoHeader>
          <IconContainer
            onKeyDown={onCollapseAsideButtonKeyDown}
            title="Expand sidebar"
            tabIndex={0}
            display="flex"
            layoutId="collapse-aside-icon-container"
            m="0 0 1rem 0"
            onClick={onCollapseAside}
            initial={{ rotate: 180 }}
            whileHover={{ scale: 1.05, color: theme.softDimmedText }}
            whileTap={{ scale: 0.95 }}
            role="button"
            className="collapse-navigation-aside-button"
            cursor="pointer"
          >
            <FaAngleDoubleLeft size={26} />
          </IconContainer>
          <AsideHeader collapsed title="Menu" />
          <ItemsContainer>
            {menuItems.map((item, idx) => (
              <AsideItem
                collapsed
                key={idx}
                href={item.href}
                label={item.name}
                isActive={item.regex ? item.regex.test(pathname) : pathname.includes(item.href)}
                icon={item.icon}
                iconFill={item.iconFill}
              />
            ))}
          </ItemsContainer>
          <AsideHeader collapsed title="Library" />
          <ItemsContainer>
            {!isLoggedIn ? (
              <>
                {!isCollapsed && (
                  <DimmedItemDescription>Log in to keep track of your favorite lists!</DimmedItemDescription>
                )}
                <DefaultItemContent>
                  {!isCollapsed && <DimmedItemHeader>Personal lists</DimmedItemHeader>}
                  <DefaultItemContentPlaceholder />
                  <DefaultItemContentPlaceholder />
                  <DefaultItemContentPlaceholder />
                </DefaultItemContent>
              </>
            ) : (
              libraryMenuItems.map((item, idx) => (
                <AsideItem
                  collapsed
                  key={idx}
                  href={item.href}
                  label={item.name}
                  isActive={item.regex ? item.regex.test(pathname) : pathname.includes(item.href)}
                  icon={item.icon}
                  iconFill={item.iconFill}
                />
              ))
            )}
          </ItemsContainer>
        </AsideSection>
        <AsideSection>
          {bottomItems.map((item, idx) => (
            <AsideItem
              collapsed
              onClick={() => onClick(item.identifier)}
              disabled={item.identifier === "log-out" && !isLoggedIn}
              key={idx}
              href={item.href}
              label={item.name}
              isActive={false}
              icon={item.icon}
              iconFill={item.iconFill}
            />
          ))}
        </AsideSection>
      </AsideContent>
    );

  return (
    <AsideContent $visible={isVisible}>
      <AsideSection>
        <LogoHeader>
          <RiMovie2Fill size={40} color={theme.primary} />
          <LogoSection>
            <h1>
              Screen <br />
              <strong>V</strong>ibe<strong>.</strong>
            </h1>
          </LogoSection>
          {!isVisible && (
            <IconContainer
              onKeyDown={onCollapseAsideButtonKeyDown}
              tabIndex={0}
              title="Collapse sidebar"
              layoutId="collapse-aside-icon-container"
              onClick={onCollapseAside}
              whileHover={{ scale: 1.05, color: theme.softDimmedText }}
              whileTap={{ scale: 0.95 }}
              m="0 0 0 auto"
              role="button"
              className="collapse-navigation-aside-button"
              cursor="pointer"
            >
              <FaAngleDoubleLeft size={26} />
            </IconContainer>
          )}
          <AsideMenu onClick={onToggleMenu} isDynamic={isVisible} />
        </LogoHeader>
        <AsideHeader title="Menu" />
        <ItemsContainer>
          {menuItems.map((item, idx) => (
            <AsideItem
              key={idx}
              href={item.href}
              label={item.name}
              isActive={item.regex ? item.regex.test(pathname) : pathname.includes(item.href)}
              icon={item.icon}
              iconFill={item.iconFill}
            />
          ))}
        </ItemsContainer>
        <AsideHeader title="Library" />
        <ItemsContainer>
          {!isLoggedIn ? (
            <>
              <DimmedItemDescription>Log in to keep track of your favorite lists!</DimmedItemDescription>
              <DefaultItemContent>
                <DimmedItemHeader>Personal lists</DimmedItemHeader>
                <DefaultItemContentPlaceholder />
                <DefaultItemContentPlaceholder />
                <DefaultItemContentPlaceholder />
              </DefaultItemContent>
            </>
          ) : (
            libraryMenuItems.map((item, idx) => (
              <AsideItem
                key={idx}
                href={item.href}
                label={item.name}
                isActive={item.regex ? item.regex.test(pathname) : pathname.includes(item.href)}
                icon={item.icon}
                iconFill={item.iconFill}
              />
            ))
          )}
        </ItemsContainer>
      </AsideSection>
      <AsideSection>
        {bottomItems.map((item, idx) => (
          <AsideItem
            onClick={() => onClick(item.identifier)}
            disabled={item.identifier === "log-out" && !isLoggedIn}
            key={idx}
            href={item.href}
            label={item.name}
            isActive={false}
            icon={item.icon}
            iconFill={item.iconFill}
          />
        ))}
      </AsideSection>
    </AsideContent>
  );
};

export default Content;
