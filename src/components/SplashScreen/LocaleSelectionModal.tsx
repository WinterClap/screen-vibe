import React from "react";
import { countries } from "../../constants/countries";
import { languages } from "../../constants/languages";
import { Mutable } from "../../utils/types";
import { Button, Row } from "../common";
import Select from "../Inputs/Select";
import Modal from "../Modal";
import { ModalDescription, ModalFooter, ModalHeader } from "../Modal/styles";
import { LocaleSelectionModalContainer } from "./styles";
import useHandleLocaleSelection from "./useHandleLocaleSelection";

type Props = {
  regionInfo:
    | {
        country: string;
        lang: string;
      }
    | null
    | undefined;
};

const LocaleSelectionModal = ({ regionInfo }: Props) => {
  const { onConfirmLocale, onOptionSelected, optionsSelected } = useHandleLocaleSelection();

  return (
    <Modal overflow={"auto"} portalId="locale-selection-modal" dismissible={false}>
      <LocaleSelectionModalContainer>
        <ModalHeader>Confirm your region and language</ModalHeader>
        <ModalDescription>{"It's going to be used to show you content available in your region."}</ModalDescription>
        <Row
          m="0 0 0.5rem 0"
          tabIndex={-1}
          $gap="10px"
          $flexWrap="wrap"
          $justifyContent="space-between"
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
          <Button $extended $tablet="width: 100%" onClick={() => onConfirmLocale()}>
            Confirm
          </Button>
        </ModalFooter>
      </LocaleSelectionModalContainer>
    </Modal>
  );
};

export default LocaleSelectionModal;
