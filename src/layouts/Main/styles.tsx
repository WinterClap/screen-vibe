import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  max-height: 100vh;
  background-color: ${(props) => props.theme.light};

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    grid-template-columns: 60px 1fr;
  }
`;

export const CentralContent = styled.main`
  background-color: ${(props) => props.theme.defaultBackground};
  height: 100vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Aside = styled(motion.aside)<{
  $justifyContent?: string;
  $isDynamic?: boolean;
  $isAsideCollapsed?: boolean;
}>`
  z-index: ${(props) => (props.$isDynamic ? "40" : "auto")};
  height: 100vh;
  overflow-y: auto;
  min-height: 500px;
  /* width: 250px; */
  padding: ${(props) =>
    props.$isAsideCollapsed ? "0.5rem 0.25rem" : props.$isDynamic ? "1rem 0.8rem" : "1rem 1.4rem"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.defaultBackground};
  border-right: 2px solid ${(props) => props.theme.dimmedInputFocus};

  @media (max-width: ${DEVICE_SIZES.laptop}) {
    padding: ${(props) => !props.$isDynamic && "0.2rem 0.28rem"};
  }
`;

export const LogoHeader = styled.header<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};
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

export const AsideSection = styled.div<{ $isDynamic?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) => props.$isDynamic && "padding-bottom: 2rem"}
`;
export const AsideFooter = styled.div`
  margin: auto 0px 0px 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
