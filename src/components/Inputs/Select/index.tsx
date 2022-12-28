import { AnimatePresence } from "framer-motion";
import { IoIosArrowDropdownCircle } from "react-icons/io";
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
} from "./styles";
import { useTheme } from "styled-components";
import { IconContainer } from "../../common";

type Data = {
  [key: string]: unknown;
}[];

type PossibleOption =
  | { key: string; label: string; value: string; icon: undefined }
  | { key: string; label: string; value: string; icon: React.ReactNode };

type Props = {
  data: Data;
  label: string;
  labelDataKey: string;
  valueDataKey: string;
  focusContainerIdOnBlur?: boolean;
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

const Select: React.FC<Props> = ({
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
  focusContainerIdOnBlur,
  onOptionSelected,
}) => {
  const defaultOption = defaultDataValue ? data.find((option) => option[valueDataKey] === defaultDataValue) : undefined;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const resultTooltipContainerRef = React.useRef<HTMLDivElement | null>(null);
  const inputSearchRef = React.useRef<HTMLInputElement | null>(null);
  const [dynamicData, setDynamicData] = React.useState<typeof data>(data.slice(0, 10));
  const [shouldShowDropdownList, setShouldShowDropdownList] = React.useState<boolean>();
  const [searchText, setSearchText] = React.useState<string>((defaultOption?.[labelDataKey] as string) || "");
  const [focusedOption, setFocusedOption] = React.useState<(Data[number] & { idx: number }) | undefined>();
  const [selectedOption, setSelectedOption] = React.useState<PossibleOption>({
    key: exposedKey,
    label: (defaultOption?.[labelDataKey] as string) || "",
    value: defaultDataValue || "",
    icon: (iconDataKey && (defaultOption?.[iconDataKey] as React.ReactNode)) || undefined,
  });

  console.log("focusedOption: ", focusedOption);
  const id = React.useId();
  const theme = useTheme();

  const onInputSearchContainerClick = () => {
    onListPress();
    inputSearchRef.current?.focus();
  };

  const onListPress = () => {
    setShouldShowDropdownList((prev) => !prev);
  };

  const onInputSearchFocus = () => {
    if (!shouldShowDropdownList) {
      setShouldShowDropdownList(true);
    }
    !!dynamicData.length && setFocusedOption({ ...dynamicData[0], idx: 0 });
  };

  const onInputSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value);
    setDynamicData(data.filter((option) => new RegExp(event.target.value, "i").test(option[labelDataKey] as string)));
    if (!shouldShowDropdownList) setShouldShowDropdownList(true);
  };

  const onInputSearchBlur = () => {
    setTimeout(() => {
      if (shouldShowDropdownList) setShouldShowDropdownList(false);
    }, 300);
    focusContainerIdOnBlur && containerRef.current?.focus();
    console.log(selectedOption.label);
    setSearchText(selectedOption.label);
  };

  const onInputSearchKeyDown = (event: React.KeyboardEvent) => {
    if (!["Enter", "ArrowDown", "ArrowUp"].includes(event.key)) return;
    if (dynamicData.length === 0 || !focusedOption) return;

    if (event.key === "Enter") {
      onOptionPress(focusedOption);
      return;
    }
    if (event.key === "ArrowUp") {
      if (dynamicData[focusedOption.idx - 1]) {
        setFocusedOption((prev) => ({ ...dynamicData[focusedOption.idx - 1], idx: prev!.idx - 1 }));
      } else {
        setFocusedOption({ ...dynamicData[dynamicData.length - 1], idx: dynamicData.length - 1 });
      }

      resultTooltipContainerRef.current!.scrollTop =
        (document.querySelector('[data-focused="true"]') as HTMLElement)?.offsetTop - 200;
      return;
    }
    if (event.key === "ArrowDown") {
      // resultTooltipContainerRef.current?.focus();
      if (dynamicData[focusedOption.idx + 1]) {
        console.log("aumenta");
        setFocusedOption((prev) => ({ ...dynamicData[focusedOption.idx + 1], idx: prev!.idx + 1 }));
      } else {
        console.log("reinicia");
        setFocusedOption({ ...dynamicData[0], idx: 0 });
      }
      document.querySelector('[data-focused="true"]')?.scrollIntoView();
      return;
    }
  };

  const dismissList = () => {
    setShouldShowDropdownList(false);
  };

  const onOptionPress = (option: Data[number]) => {
    console.log(option);
    setSelectedOption({
      key: exposedKey,
      label: option[labelDataKey] as string,
      value: option[valueDataKey] as string,
      icon: (iconDataKey && (option[iconDataKey] as React.ReactNode)) || undefined,
    });
    setSearchText(option[labelDataKey] as string);
    dismissList();
    inputSearchRef.current?.focus();
  };

  const onOptionKeyDown = (event: React.KeyboardEvent, option: Data[number]) => {
    if (event.key === "Enter") {
      onOptionPress(option);
    }
  };

  React.useEffect(() => {
    onOptionSelected?.(selectedOption);
  }, [selectedOption, onOptionSelected]);

  React.useEffect(() => {
    !!dynamicData.length && setFocusedOption({ ...dynamicData[0], idx: 0 });
  }, [dynamicData]);

  if (withInputSearch) {
    return (
      <SelectContainer tabIndex={-1} ref={containerRef} className="input-div" $maxWidth={maxWidth} $minWidth={minWidth}>
        <Label htmlFor={id}>{label}</Label>
        <InputSearchContainer onClick={onInputSearchContainerClick} $isFocused={shouldShowDropdownList}>
          <InputSearch
            ref={inputSearchRef}
            onKeyDown={onInputSearchKeyDown}
            onFocus={onInputSearchFocus}
            onBlur={onInputSearchBlur}
            placeholder={label}
            id={id}
            role="combobox"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            autoComplete="off"
            aria-expanded={shouldShowDropdownList}
            type="search"
            value={searchText}
            onChange={onInputSearchChange}
          />
          <IconContainer
            $pointerEvents="none"
            color={theme.text}
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
              ref={resultTooltipContainerRef}
              tabIndex={-1}
              className="input-div"
              initial={{ opacity: 0, maxHeight: "0rem" }}
              animate={{ opacity: 1, maxHeight: maxHeight || "11rem" }}
              exit={{ opacity: 0, maxHeight: "0rem" }}
            >
              {dynamicData.map((option, idx) => (
                <OptionBox
                  data-focused={option[valueDataKey] === focusedOption?.[valueDataKey]}
                  tabIndex={0}
                  key={option[valueDataKey] as string}
                  onClick={() => onOptionPress(option)}
                  onKeyDown={(event) => onOptionKeyDown(event, option)}
                >
                  {iconDataKey && <OptionIconContainer>{option[iconDataKey] as string}</OptionIconContainer>}
                  <OptionText>{option[labelDataKey] as string}</OptionText>
                </OptionBox>
              ))}
            </ResultTooltipContainer>
          )}
        </AnimatePresence>
      </SelectContainer>
    );
  }
  return null;
};

export default Select;
