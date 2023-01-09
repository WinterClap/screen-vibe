import React from "react";
import useAppTheme from "../../../../../hooks/useAppTheme";
import { Col } from "../../../../common";
import Switch, { SwitchState } from "../../../../Inputs/Switch";
import { ContentContainer, PreferencesDescription, PreferencesItem, PreferencesTitle } from "./styles";

type Props = {};

const AppereanceContent = (props: Props) => {
  const { toggleTheme, theme, saveTheme } = useAppTheme();

  const handleSwitches = (switchState: SwitchState) => {
    Object.keys(switchState).forEach((key) => {
      switch (key) {
        case "darkMode":
          toggleTheme();
          saveTheme(switchState["darkMode"] ? "dark" : "light");
          return;

        default:
          return;
      }
    });
  };

  return (
    <ContentContainer>
      <PreferencesItem>
        <Col $alignItems="flex-start">
          <PreferencesTitle>Dark mode</PreferencesTitle>
          <PreferencesDescription>Enable or disable dark mode</PreferencesDescription>
        </Col>
        <Switch name="darkMode" onStateChange={handleSwitches} defaultState={theme.MODE === "dark" ? true : false} />
      </PreferencesItem>
    </ContentContainer>
  );
};

export default AppereanceContent;
