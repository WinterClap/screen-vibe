import React from "react";
import { AiOutlineControl, AiOutlineMenu } from "react-icons/ai";
import { useTheme } from "styled-components";
import { AsideMenuContainer, AsideMenuContainerRect } from "../styles";
import UserDisplayInfo from "../UserDisplayInfo";

interface Props {
  onClick?: () => void;
  filterAside?: boolean;
}

const AsideMenu: React.FC<Props> = ({ onClick, filterAside }) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === " ") {
      onClick?.();
    }
  };

  const onMenuClick = () => {
    onClick?.();
    ref.current?.blur();
  };

  if (filterAside) {
    return (
      <AsideMenuContainerRect
        ref={ref}
        tabIndex={0}
        whileTap={{ scale: 0.95 }}
        whileFocus={{ backgroundColor: theme.primary + "1a" }}
        whileHover={{ scale: 1.05, backgroundColor: theme.primary + "1a" }}
        onClick={onMenuClick}
        onKeyDown={onKeyDown}
      >
        <UserDisplayInfo size="small" />
        <AiOutlineControl size={26} color={theme.primary} />
      </AsideMenuContainerRect>
    );
  }

  return (
    <AsideMenuContainer
      ref={ref}
      tabIndex={0}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ backgroundColor: theme.primary + "1a" }}
      whileHover={{ scale: 1.05, backgroundColor: theme.primary + "1a" }}
      onClick={onMenuClick}
      onKeyDown={onKeyDown}
    >
      <AiOutlineMenu size={26} color={theme.primary} />
    </AsideMenuContainer>
  );
};

export default AsideMenu;
