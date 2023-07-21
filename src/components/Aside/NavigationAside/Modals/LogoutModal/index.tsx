import { useRouter } from "next/router";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { AuthenticationSessionDeleteData } from "../../../../../../pages/api/authentication/session/delete";
import { setToastData } from "../../../../../slices/toastMessageSlice";
import { setShouldShowLogoutModal } from "../../../../../slices/userSlice";
import { Button, IconContainer } from "../../../../common";
import Modal from "../../../../Modal";
import { ModalDescription, ModalFooter, ModalHeader } from "../../../../Modal/styles";
import { LogoutModalContainer } from "./styles";
import { deleteSessionIdFromLocalStorage } from "./utils";

type Props = {};

const LogoutModal = (props: Props) => {
  const { reload } = useRouter();
  const theme = useTheme();
  const dispath = useDispatch();

  const onRequestClose = () => {
    dispath(setShouldShowLogoutModal(false));
  };

  const onCancelClick = () => {
    onRequestClose();
  };

  const onLogoutClick = async () => {
    try {
      await fetch("/api/authentication/session/delete", {
        method: "DELETE",
        body: JSON.stringify({
          session_id: localStorage.getItem("session_id"),
        }),
      });

      deleteSessionIdFromLocalStorage();
      reload();
    } catch (error) {
      console.error(error);
      deleteSessionIdFromLocalStorage();
      reload();
    }
  };

  return (
    <Modal portalId="logout-modal" onRequestClose={onRequestClose}>
      <LogoutModalContainer>
        <ModalHeader>
          Are you sure?
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
        <ModalDescription $enhanced>Do you really want to logout?</ModalDescription>
        <ModalFooter $justifyContent="space-between">
          <Button $extended onClick={onCancelClick}>
            Cancel
          </Button>
          <Button $secondary $extended onClick={onLogoutClick}>
            Log out
          </Button>
        </ModalFooter>
      </LogoutModalContainer>
    </Modal>
  );
};
export default LogoutModal;
