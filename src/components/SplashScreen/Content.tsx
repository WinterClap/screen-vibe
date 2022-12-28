import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "styled-components";
import { AmbienceBox } from "./styles";

type Props = {};

const Content = (props: Props) => {
  const theme = useTheme();
  const scale = useMotionValue(0.7);
  const fillColor = useTransform(scale, [0.7, 1], [theme.secondary, theme.primary]);

  return (
    <>
      <AmbienceBox />
      <motion.svg
        style={{ scale, color: fillColor }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        fill="currentColor"
        strokeWidth="1"
        stroke="none"
        viewBox="0 0 24 24"
        height="80"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ repeatDelay: 0.5, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            stroke={theme.text}
            d="M18.001 20H20v2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.985 9.985 0 0 1-3.999 8zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          ></motion.path>
        </g>
      </motion.svg>
    </>
  );
};

export default Content;
