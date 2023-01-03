import React from "react";
import Modal from "../../../Modal";
import { ModalHeader, ModalSideBarMenuContainer } from "../../../Modal/styles";
import { PreferencesModalContainer, PreferencesModalGrid } from "./styles";

type Props = {};

const PreferencesModal = (props: Props) => {
  return (
    <Modal portalId="preferences-modal">
      <PreferencesModalContainer>
        <ModalHeader>Preferences</ModalHeader>
        <PreferencesModalGrid>
          <ModalSideBarMenuContainer></ModalSideBarMenuContainer>
        </PreferencesModalGrid>
      </PreferencesModalContainer>
    </Modal>
  );
};

export default PreferencesModal;
