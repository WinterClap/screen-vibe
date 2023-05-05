import React from "react";
import { AsideText } from "../styles";

interface Props {
  title: string;
  collapsed?: boolean;
}

const AsideHeader: React.FC<Props> = ({ title, collapsed }) => {
  return <AsideText $collapsed={collapsed}>{title}</AsideText>;
};

export default AsideHeader;
