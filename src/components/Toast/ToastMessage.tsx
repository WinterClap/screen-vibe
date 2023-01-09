import React from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { dismissToastMessage, ToastMessageSliceState } from "../../slices/toastMessageSlice";
import { RootState } from "../../store";
import { Col, Row } from "../common";
import { ToastMessageContainer, ToastMessageContent, ToastMessageHeader } from "./styles";
import { IoAlertCircleOutline, IoWarningOutline } from "react-icons/io5";

const ToastMessage = () => {
  const theme = useTheme();
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch();
  const { toastData, shouldShowToastMessage } = useSelector((state: RootState) => state.toastMessage) as {
    toastData: NonNullable<ToastMessageSliceState["toastData"]>;
    shouldShowToastMessage: boolean;
  };

  const onToastMessageMouseDown = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  const onToastMessageClick = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    dispatch(dismissToastMessage());
  };

  React.useEffect(() => {
    if (toastData === null) return;

    console.log(toastData);
    const dismissToast = () => {
      dispatch(dismissToastMessage());
    };
    const startToast = () => {
      timeout.current = setTimeout(() => {
        dismissToast();
      }, toastData.duration);
    };
    startToast();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [dispatch, toastData]);

  return (
    <AnimatePresence>
      {shouldShowToastMessage && (
        <ToastMessageContainer
          key="toast-message-container"
          onMouseDown={onToastMessageMouseDown}
          onClick={onToastMessageClick}
          whileTap={{ scale: 0.95 }}
          initial={{ y: -50, x: "-50%" }}
          animate={{ y: 10 }}
          exit={{ y: "-110%", x: "-50%" }}
        >
          <Row cursor="pointer" $gap="5px" $alignItems="center" $justifyContent="flex-start">
            {toastData.icon && Icon(toastData.icon, theme)}
            <Col $gap="5px" h="max-content" $alignItems="flex-start">
              {toastData.title && <ToastMessageHeader>{toastData.title}</ToastMessageHeader>}
              <ToastMessageContent>{toastData.content}</ToastMessageContent>
            </Col>
          </Row>
        </ToastMessageContainer>
      )}
    </AnimatePresence>
  );
};

const Icon = (iconType: NonNullable<NonNullable<ToastMessageSliceState["toastData"]>["icon"]>, theme: DefaultTheme) => {
  switch (iconType) {
    case "success":
      return <IoIosCheckmarkCircleOutline size={24} color={theme.success} />;
    case "danger":
      return <IoIosCloseCircleOutline size={24} color={theme.secondary} />;
    case "warning":
      return <IoWarningOutline size={24} color={theme.warning} />;
    case "info":
      return <IoAlertCircleOutline size={24} color={theme.highlightInput} />;
    default:
      return null;
  }
};

export default ToastMessage;
