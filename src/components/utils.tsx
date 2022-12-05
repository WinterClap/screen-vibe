import React from "react";

export const withProps = (Component: React.ComponentType, extraProps: { [key: string]: any }) => {
  return <Component {...extraProps} />;
};
