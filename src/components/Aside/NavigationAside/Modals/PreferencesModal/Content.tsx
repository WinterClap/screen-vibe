import React from "react";
import AppereanceContent from "./AppereanceContent";
import RegionContent from "./RegionContent";
import { PreferencesOption } from "./types";

type Props = {
  section: PreferencesOption["name"] | null;
};

const Content = ({ section }: Props) => {
  switch (section) {
    case "Appereance":
      return <AppereanceContent />;
    case "Region":
      return <RegionContent />;
    default:
      return null;
  }
};

export default Content;
