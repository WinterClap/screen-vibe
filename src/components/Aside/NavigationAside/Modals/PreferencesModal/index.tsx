import { AnimatePresence, Variants } from "framer-motion";
import React from "react";
import { IoChevronBack, IoChevronForward, IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { DEVICE_SIZES } from "../../../../../constants";
import { setShouldShowPreferencesModal } from "../../../../../slices/generalSlice";
import { getPxFromSize } from "../../../../../utils";
import { IconContainer } from "../../../../common";
import Modal from "../../../../Modal";
import { ModalHeader, ModalSidebarMainContainer, ModalSideBarMenuContainer } from "../../../../Modal/styles";
import { preferencesOptions } from "./contants";
import Content from "./Content";
import {
  PreferencesModalContainer,
  PreferencesModalGrid,
  PreferencesOptionsContainer,
  PreferencesOptionBox,
  ModalSideBarMainContainerDynamic,
  PageContextContainer,
  PageContextText,
} from "./styles";
import type { PreferencesOption } from "./types";

type Props = {};

const TABLET_SIZE = getPxFromSize(DEVICE_SIZES.tablet);

const PreferencesModal = ({}: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [shouldBeDynamic, setShouldBeDynamic] = React.useState<boolean>(false);
  const [activeSection, setActiveSection] = React.useState<PreferencesOption["name"] | null>(
    shouldBeDynamic ? null : "Appereance"
  );

  const onPreferencesOptionClick = (option: PreferencesOption) => {
    setActiveSection(option.name);
  };

  const onPreferencesOptionKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, option: PreferencesOption) => {
    if (e.key === "Enter") {
      setActiveSection(option.name);
    }
  };

  React.useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth < TABLET_SIZE) {
        setShouldBeDynamic(true);
        return;
      }
      setShouldBeDynamic(false);
    };

    onWindowResize();

    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  const variants: Variants = {
    hide: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
  };

  const goBack = () => {
    setActiveSection(null);
  };

  const onGoBackIconKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      goBack();
    }
  };

  const onCloseIconKeydown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {};

  const onRequestClose = () => {
    dispatch(setShouldShowPreferencesModal(false));
  };

  return (
    <Modal portalId="preferences-modal" onRequestClose={onRequestClose}>
      <PreferencesModalContainer>
        <ModalHeader>
          Preferences
          <IconContainer
            onClick={onRequestClose}
            whileHover={{ scale: 1.05, rotate: [0, 20, -20, 0] }}
            role="button"
            cursor="pointer"
            color={theme.text}
            tabIndex={0}
          >
            <IoCloseSharp size={32} />
          </IconContainer>
        </ModalHeader>
        <PreferencesModalGrid>
          <ModalSideBarMenuContainer>
            <AnimatePresence mode="wait">
              {!shouldBeDynamic && (
                <PreferencesOptionsContainer key="preferences-options-container" transition={{ duration: 10 }}>
                  {preferencesOptions.map((option, idx) => (
                    <PreferencesOptionBox
                      tabIndex={0}
                      className="input-li"
                      onKeyDown={(e) => onPreferencesOptionKeyDown(e, option)}
                      onClick={() => onPreferencesOptionClick(option)}
                      key={idx}
                      $isActive={activeSection === option.name}
                    >
                      {option.name}
                      <IoChevronForward
                        color={activeSection === option.name ? theme.primary : theme.dimmedText}
                        size={16}
                      />
                    </PreferencesOptionBox>
                  ))}
                </PreferencesOptionsContainer>
              )}
              {activeSection === null && shouldBeDynamic && (
                <PreferencesOptionsContainer
                  key="preferences-options-container-dynamic"
                  initial="hide"
                  animate="animate"
                  exit="hide"
                  variants={variants}
                  // transition={{ duration: 10 }}
                >
                  {preferencesOptions.map((option, idx) => (
                    <PreferencesOptionBox
                      tabIndex={0}
                      className="input-li"
                      onKeyDown={(e) => onPreferencesOptionKeyDown(e, option)}
                      onClick={() => onPreferencesOptionClick(option)}
                      key={idx}
                      $isActive={activeSection === option.name}
                    >
                      {option.name}
                      <IoChevronForward
                        color={activeSection === option.name ? theme.primary : theme.dimmedText}
                        size={16}
                      />
                    </PreferencesOptionBox>
                  ))}
                </PreferencesOptionsContainer>
              )}
              {activeSection && (
                <ModalSideBarMainContainerDynamic
                  key="modal-side-bar-main-container-dynamic"
                  // transition={{ ease: "linear", duration: 10 }}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                >
                  <PageContextContainer>
                    <IconContainer
                      onClick={goBack}
                      onKeyDown={onGoBackIconKeyDown}
                      tabIndex={0}
                      cursor="pointer"
                      color={theme.dimmedText}
                      p="5px"
                    >
                      <IoChevronBack color={theme.dimmedText} size={16} />
                    </IconContainer>
                    <PageContextText>{activeSection}</PageContextText>
                  </PageContextContainer>
                  <Content section={activeSection} />
                </ModalSideBarMainContainerDynamic>
              )}
            </AnimatePresence>
          </ModalSideBarMenuContainer>

          <ModalSidebarMainContainer>
            <Content section={activeSection} />
          </ModalSidebarMainContainer>
        </PreferencesModalGrid>
      </PreferencesModalContainer>
    </Modal>
  );
};

export default PreferencesModal;
