import React from "react";
import { useTheme } from "styled-components";
import { countries } from "../../../../../constants/countries";
import { languages } from "../../../../../constants/languages";
import { LOCALE_COOKIE_NAME } from "../../../../../cookie-constants";
import { GeneralSliceState } from "../../../../../slices/generalSlice";
import { getCookieValueFromName } from "../../../../../utils";
import { Mutable } from "../../../../../utils/types";
import { Button, Row } from "../../../../common";
import Select from "../../../../Inputs/Select";
import { ModalFooter } from "../../../../Modal/styles";
import useHandleLocaleSelection from "../../../../SplashScreen/useHandleLocaleSelection";
import { getCountryAndLanguageFromLocale } from "../../../../SplashScreen/utils";
import { ContentContainer, PreferencesDescription, PreferencesTitle } from "./styles";

type Props = {};

const RegionContent = (props: Props) => {
  const theme = useTheme();
  const { onConfirmLocale, onOptionSelected, optionsSelected } = useHandleLocaleSelection();

  const locale = getCookieValueFromName(LOCALE_COOKIE_NAME);
  const regionInfo = locale && getCountryAndLanguageFromLocale(locale as GeneralSliceState["locale"]);

  return (
    <ContentContainer>
      <PreferencesTitle>Confirm your region and language</PreferencesTitle>
      <PreferencesDescription>
        {"It's going to be used to show you content available in your region."}
      </PreferencesDescription>
      <pre>{JSON.stringify(optionsSelected, null, 2)}</pre>
      <Row tabIndex={-1} $gap="10px" $flexWrap="wrap" $justifyContent="space-between" $tablet="justify-content: center">
        <Select
          data={countries as Mutable<typeof countries>}
          exposedKey="country"
          iconDataKey="emoji"
          defaultDataValue={(regionInfo && regionInfo.country) || undefined}
          label="Select country"
          labelDataKey="name"
          valueDataKey="code"
          onOptionSelected={onOptionSelected}
        />
        <Select
          data={languages as Mutable<typeof languages>}
          exposedKey="lang"
          defaultDataValue={(regionInfo && regionInfo.lang) || undefined}
          label="Select language"
          labelDataKey="name"
          valueDataKey="code"
          onOptionSelected={onOptionSelected}
        />
      </Row>
      <ModalFooter tabIndex={-1} className="input-div" $justifyContent="flex-end">
        <Button
          $extended
          $tablet="width: 100%"
          onClick={() =>
            onConfirmLocale({
              withToastMessage: {
                content: "Preferences saved",
                icon: "success",
              },
            })
          }
        >
          Confirm
        </Button>
      </ModalFooter>
    </ContentContainer>
  );
};

export default RegionContent;
