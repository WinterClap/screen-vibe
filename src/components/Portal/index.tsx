import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = {
  containerId: string;
};

const createWrapperAndAppendToBody = (containerId: string) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", containerId);
  document.body.appendChild(wrapper);

  return wrapper;
};

const Portal: React.FC<PropsWithChildren<Props>> = ({ containerId, children }) => {
  const [wrapperElement, setWrapperElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    let element = document.getElementById(containerId);
    // if element is not found with containerId or containerId is not provided,
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(containerId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default Portal;
