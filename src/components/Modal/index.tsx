import { useMotionValue } from "framer-motion";
import React, { PropsWithChildren } from "react";
import Portal from "../Portal";
import { ModalContainer, ModalWrapper } from "./styles";

type Props = {
  portalId: string;
  onRequestClose?: () => void;
  dismissible?: boolean;
  overflow?: "auto" | "hidden" | "visible";
};

const Modal: React.FC<PropsWithChildren<Props>> = ({
  onRequestClose,
  portalId,
  dismissible = true,
  children,
  overflow = "visible",
}) => {
  const [focusables, setFocusables] = React.useState<NodeListOf<HTMLElement>>();
  const containerRef = React.useCallback((element: HTMLElement) => {
    if (element !== null) {
      setFocusables(
        element.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="search"]:not([disabled]) , input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), .input-div, .input-li'
        )
      );
    }
  }, []);

  const onClose = React.useCallback(() => {
    if (!dismissible) return;
    onRequestClose?.();
  }, [dismissible, onRequestClose]);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        if (focusables?.length === 0) return;
        if (event.shiftKey) {
          if (document.activeElement === focusables?.[0]) {
            focusables[focusables.length - 1].focus?.();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === focusables?.[focusables.length - 1]) {
            focusables?.[0].focus?.();
            event.preventDefault();
          }
        }
      }
    },
    [onClose, focusables]
  );

  React.useEffect(() => {
    document.getElementById(`${portalId}-container`)?.focus();
    document.body.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown, portalId]);

  const opacity = useMotionValue(1);

  return (
    <Portal containerId={portalId}>
      <ModalContainer
        style={{ opacity }}
        exit={{ opacity: 0 }}
        $overflow={overflow}
        tabIndex={-1}
        id={`${portalId}-container`}
        ref={containerRef as unknown as React.RefObject<HTMLDivElement>}
        role="dialog"
      >
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
