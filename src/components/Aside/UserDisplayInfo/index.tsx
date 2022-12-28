import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "styled-components";
import { IconContainer } from "../../common";
import { ImageContainer, UserDisplayInfoContainer } from "./styles";

type Props = {
  size?: "normal" | "small";
};

const UserDisplayInfo = ({ size = "normal" }: Props) => {
  const theme = useTheme();
  const profilePicURL = "";
  const isLoggedIn = false;

  return (
    <UserDisplayInfoContainer $size={size}>
      <ImageContainer $size={size}>
        {isLoggedIn ? (
          <Image src={profilePicURL} fill alt="User Profile Picture" />
        ) : (
          <IconContainer cursor="pointer" w="100%" h="100%" color={theme.dimmedText}>
            <FaUserCircle size={size === "normal" ? 35 : 30} />
          </IconContainer>
        )}
      </ImageContainer>
    </UserDisplayInfoContainer>
  );
};

export default UserDisplayInfo;
