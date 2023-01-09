import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { setShouldShowLoginModal } from "../../../slices/generalSlice";
import { RootState } from "../../../store";
import { IconContainer } from "../../common";
import { PROFILE_PIC_BASE_URL_W185 } from "./constants";
import { ImageContainer, UserDisplayCol, UserDisplayInfoContainer, UserLinkButton, UserText } from "./styles";

type Props = {
  size?: "normal" | "small";
  requestCloseAside?: () => void;
};

const UserDisplayInfo = ({ size = "normal", requestCloseAside }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn, accountDetails } = useSelector((state: RootState) => state.user);

  const onLoginButtonLinkClick = () => {
    dispatch(setShouldShowLoginModal(true));
    requestCloseAside?.();
  };

  return (
    <UserDisplayInfoContainer $size={size}>
      <ImageContainer $size={size}>
        {isLoggedIn && accountDetails?.avatar.tmdb ? (
          <>
            <Image
              style={{ borderRadius: "50%", objectFit: "contain" }}
              src={`${PROFILE_PIC_BASE_URL_W185}${accountDetails.avatar.tmdb.avatar_path}`}
              fill
              alt="profile-pic"
            />
          </>
        ) : (
          <>
            <IconContainer cursor="pointer" w="100%" h="100%" color={theme.dimmedText}>
              <FaUserCircle size={size === "normal" ? 35 : 30} />
            </IconContainer>
          </>
        )}
      </ImageContainer>
      <UserDisplayCol $size={size}>
        {isLoggedIn ? (
          <>
            <UserText $highlight>{accountDetails?.username}</UserText>
            {accountDetails?.name && <UserText>{accountDetails.name}</UserText>}
          </>
        ) : (
          <>
            <UserText $highlight>Hello, Stranger</UserText>
            <UserLinkButton onClick={onLoginButtonLinkClick}>Login or register</UserLinkButton>
          </>
        )}
      </UserDisplayCol>
    </UserDisplayInfoContainer>
  );
};

export default UserDisplayInfo;
