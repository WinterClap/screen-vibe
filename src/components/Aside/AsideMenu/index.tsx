import React from "react";
import { AsideMenuContainer } from "../styles";
import { AiOutlineMenu } from "react-icons/ai";
import { useTheme } from "styled-components";

interface Props {
  onClick?: () => void;
}

const AsideMenu: React.FC<Props> = ({ onClick }) => {
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
