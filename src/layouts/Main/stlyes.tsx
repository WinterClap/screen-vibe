import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  max-height: 100vh;
  background-color: ${(props) => props.theme.light};

  //fix this for laptop
  @media (max-width: ${DEVICE_SIZES.laptop}) {
    grid-template-columns: 60px 1fr 60px;
  }
`;

export const CentralContent = styled.main`
  background-color: ${(props) => props.theme.defaultBackground};
  height: 100vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export const Aside = styled(motion.aside)<{ $justifyContent?: string; $isDynamic?: boolean }>`
  z-index: ${(props) => (props.$isDynamic ? "2" : "auto")};
  border: 1px solid black;
  height: 100vh;
  min-height: 500px;
  /* width: 250px; */
  padding: 1rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.defaultBackground};

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    padding: ${(props) => !props.$isDynamic && "0.2rem 0.28rem"};
  }
`;

export const LogoHeader = styled.header`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
  gap: 5px;
`;

export const LogoSection = styled.div`
  font-size: 1.2rem;
  user-select: none;
  font-weight: bold;
  margin: 0px;
  strong {
    color: ${(props) => props.theme.primary};
  }
  h1 {
    margin: 0px;
  }
`;

export const AsideSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AsideFooter = styled.div`
  margin: auto 0px 0px 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
