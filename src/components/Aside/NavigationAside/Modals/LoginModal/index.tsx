import { useRouter } from "next/router";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import type { AuthenticationTokenNewData } from "../../../../../../pages/api/authentication/token/new";
import { setShouldShowLoginModal } from "../../../../../slices/generalSlice";
import { setToastData } from "../../../../../slices/toastMessageSlice";
import { Button, IconContainer } from "../../../../common";
import DotsLoader from "../../../../Loaders/DotsLoader";
import Modal from "../../../../Modal";
import { ModalDescription, ModalFooter, ModalHeader } from "../../../../Modal/styles";
import { LoginModalContainer } from "./styles";

type Props = {};

const LoginModal = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { push } = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const onRequestClose = () => {
    dispatch(setShouldShowLoginModal(false));
  };

  const onLoginButtonClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/authentication/token/new");
      const json = (await res.json()) as AuthenticationTokenNewData;
      if (json.success) {
        await push(
          `https://www.themoviedb.org/authenticate/${json.request_token}?` +
            new URLSearchParams({
              redirect_to: window.location.origin,
            })
        );
      }
    } catch (error) {
      dispatch(setToastData({ content: "There was a problem logging you in" }));
      setIsLoading(false);
      onRequestClose();
    }
  };

  return (
    <Modal portalId="login-register-modal" onRequestClose={onRequestClose}>
      <ModalHeader>
        Login or Register
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
      <LoginModalContainer>
        <ModalDescription $enhanced>
          Login or register using the <strong>TMDb</strong> services and unleash several features like the ability to{" "}
          <strong>rate</strong> movies, <strong>maintain</strong> your favourite and watch lists as well as doing things
          like <strong>create</strong> and <strong>edit</strong> custom lists, all while staying in sync with your
          account on TMDB.
        </ModalDescription>
        <ModalFooter>
          <Button disabled={isLoading} $display="flex" w="100%" onClick={onLoginButtonClick}>
            {isLoading ? <DotsLoader color={theme.focusButtonPrimary} /> : "Proceed to TMDb login/register page"}
          </Button>
        </ModalFooter>
      </LoginModalContainer>
    </Modal>
  );
};

export default LoginModal;
