import { AnimatePresence } from "framer-motion";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { BiArchive } from "react-icons/bi";
import React from "react";
import {
  InputSearch,
  Label,
  ResultTooltipContainer,
  SelectContainer,
  OptionBox,
  OptionText,
  OptionIconContainer,
  InputSearchContainer,
  InputInlineIcon,
  EmptyListPlaceholder,
  EmptyListText,
} from "./styles";
import { IconContainer } from "../../common";
import useHandleSelect from "./useHandleSelect";
import { useTheme } from "styled-components";

type Data = {
  [key: string]: unknown;
}[];

export type PossibleOption =
  | { key: string; label: string; value: string; icon: undefined }
  | { key: string; label: string; value: string; icon: React.ReactNode };

export type SelectProps = {
  data: Data;
  label: string;
  labelDataKey: string;
  valueDataKey: string;
  focusContainerOnBlur?: boolean;
  withInputSearch?: boolean;
  iconDataKey?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  defaultDataValue?: string;
  defaultDataLabel?: string;
  iconOffset?: string;
  exposedKey: string;
  onOptionSelected?: ({ key, label, value }: { key: string; label: string; value: string }) => void;
};

const Select: React.FC<SelectProps> = ({
  data,
  iconDataKey,
  labelDataKey,
  valueDataKey,
  maxWidth,
  maxHeight,
  minWidth,
  label,
  defaultDataValue,
  withInputSearch = true,
  exposedKey,
  iconOffset,
  focusContainerOnBlur,
  onOptionSelected,
}) => {
  const theme = useTheme();
  const {
    containerRef,
    resultTooltipContainerRef,
    inputSearchRef,
    dynamicData,
    focusedOption,
    id,
    searchText,
    shouldShowDropdownList,
    selectedOption,
    onInputSearchBlur,
    onResultTooltipContainerMouseDown,
    onInputSearchChange,
    onInputSearchContainerClick,
    onInputSearchFocus,
    onInputSearchKeyDown,
    onInputSearchClick,
    onOptionKeyDown,
    onOptionPress,
    onLabelClick,
  } = useHandleSelect({
    data,
    defaultDataValue,
    valueDataKey,
    exposedKey,
    labelDataKey,
    iconDataKey,
    focusContainerOnBlur,
    onOptionSelected,
  });

  if (withInputSearch) {
    return (
      <SelectContainer tabIndex={-1} ref={containerRef} $maxWidth={maxWidth} $minWidth={minWidth}>
        <Label onClick={onLabelClick} htmlFor={id}>
          {label}
        </Label>
        <InputSearchContainer onClick={onInputSearchContainerClick} $isFocused={shouldShowDropdownList}>
          <InputSearch
            ref={inputSearchRef}
            onKeyDown={onInputSearchKeyDown}
            onFocus={onInputSearchFocus}
            onBlur={onInputSearchBlur}
            onClick={onInputSearchClick}
            onChange={onInputSearchChange}
            placeholder={label}
            id={id}
            role="combobox"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            autoComplete="off"
            aria-expanded={shouldShowDropdownList}
            type="search"
            value={searchText}
          />
          <IconContainer
            initial={false}
            animate={{ rotate: shouldShowDropdownList ? 180 : 0, transition: { duration: 0.3 } }}
            $pointerEvents="none"
            color={shouldShowDropdownList ? theme.highlightInput : theme.dimmedText}
            pos="absolute"
            $inset="auto 10px auto auto"
            cursor="pointer"
          >
            <IoIosArrowDropdownCircle size={22} />
          </IconContainer>
          <InputInlineIcon $iconOffset={iconOffset}>{iconDataKey && selectedOption.icon}</InputInlineIcon>
        </InputSearchContainer>
        <AnimatePresence>
          {shouldShowDropdownList && (
            <ResultTooltipContainer
              onMouseDown={onResultTooltipContainerMouseDown}
              ref={resultTooltipContainerRef}
              style={{ padding: "0px 0px 0px 0px" }}
              // tabIndex={-1}
              className="input-div"
              initial={{ opacity: 0, maxHeight: "0" }}
              animate={{ opacity: 1, maxHeight: maxHeight || "11rem", padding: "5px 0px 5px 5px" }}
              exit={{ opacity: 0, maxHeight: "0rem", padding: "0px 0px 0px 0px", border: "2px solid transparent" }}
            >
              {dynamicData.map((option, idx) => (
                <OptionBox
                  title={option[labelDataKey] as string}
                  aria-selected={option[valueDataKey] === selectedOption.value}
                  data-selected={option[valueDataKey] === selectedOption.value}
                  data-focused={option[valueDataKey] === focusedOption?.[valueDataKey]}
                  key={option[valueDataKey] as string}
                  onClick={() => onOptionPress(option)}
                  onKeyDown={(event) => onOptionKeyDown(event, option)}
                >
                  {iconDataKey && <OptionIconContainer>{option[iconDataKey] as string}</OptionIconContainer>}
                  <OptionText>{option[labelDataKey] as string}</OptionText>
                </OptionBox>
              ))}
              {!dynamicData.length && (
                <EmptyListPlaceholder>
                  <BiArchive size={48} color={theme.dimmedText} />
                  <EmptyListText>No matches</EmptyListText>
                </EmptyListPlaceholder>
              )}
            </ResultTooltipContainer>
          )}
        </AnimatePresence>
      </SelectContainer>
    );
  }
  return null;
};

export default Select;
