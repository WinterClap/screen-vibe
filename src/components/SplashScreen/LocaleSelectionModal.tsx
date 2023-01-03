import React from "react";
import { useDispatch } from "react-redux";
import { countries } from "../../constants/countries";
import { languages } from "../../constants/languages";
import { setLocale, setShouldShowLocaleSelectionModal } from "../../slices/generalSlice";
import { Mutable } from "../../utils/types";
import { Button, Row } from "../common";
import Select, { PossibleOption } from "../Inputs/Select";
import Modal from "../Modal";
import { ModalDescription, ModalFooter, ModalHeader } from "../Modal/styles";
import { LocaleSelectionModalContainer } from "./styles";

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
  // const [optionsSelected, setOptionsSelected] = React.useState<Record<PossibleOption["key"], Partial<PossibleOption>>>(
  const [optionsSelected, setOptionsSelected] = React.useState<Pick<PossibleOption, "key" | "label" | "value">[]>([]);
  console.log(optionsSelected);

  const dispatch = useDispatch();
  const onRequestCloseLocaleSelectionModal = () => {
    dispatch(setShouldShowLocaleSelectionModal(false));
  };

  const onOptionSelected = React.useCallback((option: Pick<PossibleOption, "key" | "label" | "value">) => {
    // setOptionsSelected((prev) => ({ ...prev, [option.key]: { ...prev[option.key], ...option } }));
    setOptionsSelected((prev) => {
      const existingObj = prev.findIndex((opt) => opt.key === option.key);
      if (existingObj >= 0) {
        prev[existingObj] = option;
        return [...prev];
      }
      return [...prev, option];
    });
  }, []);

  const onConfirmLocale = () => {
    dispatch(
      setLocale(
        `${optionsSelected[1].key as typeof languages[number]["code"]}-${
          optionsSelected[0].key as typeof countries[number]["code"]
        }`
      )
    );
    dispatch(setShouldShowLocaleSelectionModal(false));
  };

  return (
    <Modal
      overflow={"visible"}
      portalId="locale-selection-modal"
      onRequestClose={onRequestCloseLocaleSelectionModal}
      dismissible={false}
    >
      <LocaleSelectionModalContainer>
        <ModalHeader>Confirm your region and language</ModalHeader>
        <ModalDescription>{"It's going to be used to show you content available in your region."}</ModalDescription>
        <pre>{JSON.stringify(optionsSelected, null, 2)}</pre>
        <Row
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
          <Button $extended $tablet="width: 100%" onClick={onConfirmLocale}>
            Confirm
          </Button>
        </ModalFooter>
      </LocaleSelectionModalContainer>
    </Modal>
  );
};

export default LocaleSelectionModal;
