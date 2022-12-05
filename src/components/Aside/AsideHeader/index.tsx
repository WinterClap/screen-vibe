import React from "react";
import { AsideText } from "../styles";
import Link from "next/link";

interface Props {
  title: string;
}

const AsideHeader: React.FC<Props> = ({ title }) => {
  return <AsideText>{title}</AsideText>;
};

export default AsideHeader;
