import React from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { useTheme } from "styled-components";
import { AsideSection, LogoHeader, LogoSection } from "../../../layouts/Main/styles";
import AsideHeader from "../AsideHeader";
import AsideItem from "../AsideItem";
import AsideMenu from "../AsideMenu";
import { AsideContent, ItemsContainer } from "../styles";
import { menuItems, bottomItems, BottomItems } from "./constants";

interface Props {
  onToggleMenu: () => void;
  onMouseEnter: (name: string) => void;
  onClick: (name: BottomItems[number]["name"]) => void;
  focusedItem: string | null;
  isVisible?: boolean;
  onRequestCloseDynamicAside?: (event: KeyboardEvent) => void;
}

const Content: React.FC<Props> = ({
  onToggleMenu,
  onMouseEnter,
  onClick,
  onRequestCloseDynamicAside,
  focusedItem,
  isVisible,
}) => {
  const theme = useTheme();

  React.useEffect(() => {
    if (!onRequestCloseDynamicAside) {
      return;
    }
    window.addEventListener("keydown", onRequestCloseDynamicAside);
    return () => window.removeEventListener("keydown", onRequestCloseDynamicAside);
  }, [onRequestCloseDynamicAside]);

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
          <AsideMenu onClick={onToggleMenu} isDynamic={isVisible} />
        </LogoHeader>
        <AsideHeader title="Menu" />
        <ItemsContainer>
          {menuItems.map((item, idx) => (
            <AsideItem
              onMouseEnter={() => onMouseEnter(item.name)}
              key={idx}
              href={item.href}
              label={item.name}
              isActive={false}
              isFocused={focusedItem === item.name}
              icon={item.icon}
              iconFill={item.iconFill}
            />
          ))}
        </ItemsContainer>
        <AsideHeader title="Library" />
      </AsideSection>
      <AsideSection>
        {bottomItems.map((item, idx) => (
          <AsideItem
            onMouseEnter={() => onMouseEnter(item.name)}
            onClick={() => onClick(item.name)}
            key={idx}
            href={item.href}
            label={item.name}
            isActive={false}
            isFocused={focusedItem === item.name}
            icon={item.icon}
            iconFill={item.iconFill}
          />
        ))}
      </AsideSection>
    </AsideContent>
  );
};

export default Content;
