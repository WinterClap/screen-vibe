import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const AsideText = styled.h1`
  color: ${(props) => props.theme.text};
  font-size: 1.4rem;
  margin: 0px 0px 10px 0px;
  width: 100%;
`;

export const AsideContent = styled(motion.div)<{ $visible?: boolean }>`
  width: ${(props) => (props.$visible ? "auto" : "100%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    display: ${(props) => (props.$visible ? "flex" : "none")};
  }
`;

export const ItemsContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
`;

export const AsideItemContainer = styled.div`
  display: flex;
  /* padding: 10px 20px !important; */
  align-items: center;
  gap: 10px;
  padding: 0;
  margin: 0px 0px;
`;

export const ItemWrapper = styled(motion.div)`
  background-color: ${(props) => props.theme.primary + "2a"};
  left: -5%;
  width: 110%;
  height: 100%;
  z-index: -1;
  position: absolute;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.primary + "4f"};
`;

export const AsideItemBox = styled.li`
  display: flex;
  z-index: 1;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 5px;
`;

export const AsideMenuContainer = styled(motion.div)`
  display: none;
  cursor: pointer;
  /* border: 1px solid black; */
  border-radius: 50%;
  width: 40px;
  height: 40px;

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
  }
`;

export const AsideOpaqueBackground = styled(motion.div)`
  background-color: rgba(15, 15, 15, 0.2);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`;

export const AsideDrawerContainer = styled(motion.div)`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`;
