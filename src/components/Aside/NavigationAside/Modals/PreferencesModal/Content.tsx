import React from "react";
import AppereanceContent from "./AppereanceContent";
import RegionContent from "./RegionContent";
import { PreferencesOption } from "./types";
import InfoAndAttributionsContent from "./InfoAndAttributionsContent";

type Props = {
  section: PreferencesOption["name"] | null;
};

const Content = ({ section }: Props) => {
  switch (section) {
    case "Appereance":
      return <AppereanceContent />;
    case "Region":
      return <RegionContent />;
    case "Info":
      return <InfoAndAttributionsContent />;
    default:
      return null;
  }
};

export default Content;
