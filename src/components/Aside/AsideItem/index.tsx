import React from "react";
import type { IconType } from "react-icons";
import { AsideItemBox, AsideItemContainer, AsideItemContainerWrapper, ItemWrapper } from "../styles";
import { useTheme } from "styled-components";
import { StyledLink } from "../../common";
import { withProps } from "../../utils";

interface Props {
  icon?: IconType;
  iconFill?: IconType;
  label: string;
  href: string | undefined;
  isActive?: boolean;
  collapsed?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}

const AsideItem: React.FC<Props> = ({
  icon,
  iconFill,
  onMouseEnter,
  onClick,
  label,
  href,
  isActive,
  collapsed,
  disabled,
}) => {
  const theme = useTheme();

  return (
    <AsideItemBox $isActive={isActive} $collapsed={collapsed} $disabled={disabled}>
      {href !== undefined ? (
        <StyledLink
          key="aside-link-item"
          onFocus={onMouseEnter}
          onMouseEnter={onMouseEnter}
          title={label}
          onClick={onClick}
          $w="100%"
          $p="5px 0px"
          $d="block"
          $fontWeight={600}
          $fontSize="0.9rem"
          $color={isActive ? theme.primary : theme.dimmedText}
          href={href}
        >
          <AsideItemContainer layout $collapsed={collapsed}>
            {isActive
              ? iconFill && <>{withProps(iconFill, { size: 24, color: theme.primary })}</>
              : icon && <>{withProps(icon, { size: 24, color: theme.dimmedText })}</>}
            {!collapsed && label}
          </AsideItemContainer>
        </StyledLink>
      ) : (
        <AsideItemContainerWrapper
          key="aside-item-no-href"
          tabIndex={0}
          $isActiveOrFocused={isActive}
          onMouseEnter={onMouseEnter}
          onFocus={onMouseEnter}
          onClick={onClick}
          disabled={disabled}
          title={label}
        >
          <AsideItemContainer $collapsed={collapsed}>
            {isActive
              ? iconFill && <>{withProps(iconFill, { size: 24, color: theme.primary })}</>
              : icon && <>{withProps(icon, { size: 24, color: theme.dimmedText })}</>}
            {!collapsed && label}
          </AsideItemContainer>
        </AsideItemContainerWrapper>
      )}
      {isActive && (
        <ItemWrapper
          key="wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layoutId="wrapper-animation"
          transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
        />
      )}
    </AsideItemBox>
  );
};

export default AsideItem;
