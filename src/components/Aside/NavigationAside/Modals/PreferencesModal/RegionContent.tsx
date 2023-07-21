import React from "react";
import { countries } from "../../../../../constants/countries";
import { languages } from "../../../../../constants/languages";
import { LOCALE_STORAGE_KEY_NAME } from "../../../../../cookie-constants";
import { GeneralSliceState } from "../../../../../slices/generalSlice";
import { Mutable } from "../../../../../utils/types";
import { Button, Row } from "../../../../common";
import Select from "../../../../Inputs/Select";
import { ModalFooter } from "../../../../Modal/styles";
import useHandleLocaleSelection from "../../../../SplashScreen/useHandleLocaleSelection";
import { getCountryAndLanguageFromLocale } from "../../../../SplashScreen/utils";
import { ContentContainer, PreferencesDescription, PreferencesTitle } from "./styles";

type Props = {};

const RegionContent = (props: Props) => {
  const { onConfirmLocale, onOptionSelected, optionsSelected } = useHandleLocaleSelection();

  const locale = localStorage.getItem(LOCALE_STORAGE_KEY_NAME);
  const regionInfo = locale && getCountryAndLanguageFromLocale(locale as GeneralSliceState["locale"]);

  return (
    <ContentContainer>
      <PreferencesTitle>Confirm your region and language</PreferencesTitle>
      <PreferencesDescription>
        {"It's going to be used to show you content available in your region."}
      </PreferencesDescription>
      <Row
        tabIndex={-1}
        m="0.5rem 0 0 0"
        $gap="10px"
        $flexWrap="wrap"
        $justifyContent="space-around"
        $tablet="justify-content: center"
      >
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
