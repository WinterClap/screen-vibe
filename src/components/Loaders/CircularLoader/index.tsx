import React from "react";
import { CircularLoaderContainer } from "./styles";

type Props = {
  strokeWidth?: string;
  size?: number;
  color?: string;
};

const CircularLoader = ({ size = 20, strokeWidth, color }: Props) => {
  return <CircularLoaderContainer $color={color} $size={size} $strokeWidth={strokeWidth} />;
};

export default CircularLoader;
