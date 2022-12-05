import React from "react";
import { AsideItemBox, AsideItemContainer, ItemWrapper } from "../styles";
import { useTheme } from "styled-components";
import { StyledLink } from "../../common";
import { withProps } from "../../utils";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  icon?: IconType;
  iconFill?: IconType;
  label: string;
  href: string;
  isActive?: boolean;
  isFocused?: boolean;
  onMouseEnter?: () => void;
}

const AsideItem: React.FC<Props> = ({ icon, iconFill, onMouseEnter, label, href, isActive, isFocused }) => {
  const theme = useTheme();

  return (
    <AsideItemBox>
      <AnimatePresence>
        <StyledLink
          onFocus={onMouseEnter}
          onMouseEnter={onMouseEnter}
          $w="100%"
          $p="10px 0px"
          $d="block"
          $fontWeight={600}
          $fontSize="0.9rem"
          $color={isActive || isFocused ? theme.primary : theme.dimmedText}
          href={href}
        >
          <AsideItemContainer>
            <AnimatePresence mode="wait">
              {isActive || isFocused
                ? iconFill && (
                    <motion.div
                      key="icon-fill"
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.05 } }}
                    >
                      {withProps(iconFill, { size: 24, color: theme.primary })}
                    </motion.div>
                  )
                : icon && (
                    <motion.div
                      key="icon-outline"
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.05 } }}
                    >
                      {withProps(icon, { size: 24, color: theme.dimmedText })}
                    </motion.div>
                  )}
            </AnimatePresence>
            {label}
          </AsideItemContainer>
        </StyledLink>
        {isFocused && (
          <ItemWrapper
            key="wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId="wrapper-animation"
            transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
          />
        )}
      </AnimatePresence>
    </AsideItemBox>
  );
};

export default AsideItem;
