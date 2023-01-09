import { Variants } from "framer-motion";
import React from "react";
import { useTheme } from "styled-components";
import { Dot, DotsLoaderContainer } from "./styles";

type Props = {
  quantity?: number;
  colors?: string[];
  color?: string;
};

const DotsLoader = ({ quantity = 3, colors, color }: Props) => {
  const theme = useTheme();
  const arr = new Array(quantity).fill(undefined);

  const dotVariants: Variants = {
    hidden: { y: 0, opacity: 0.5 },
    show: {
      opacity: 1,
      y: -8,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DotsLoaderContainer variants={containerVariants} initial="hidden" animate="show">
      {arr.map((_, idx) => (
        <Dot key={idx} variants={dotVariants} $color={colors?.[idx] || color || theme.text} />
      ))}
    </DotsLoaderContainer>
  );
};

export default DotsLoader;
