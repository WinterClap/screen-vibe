import React from "react";
import type { PossibleOption } from ".";
import type { SelectProps } from ".";

type HandleSelectArgs = Pick<
  SelectProps,
  | "data"
  | "defaultDataValue"
  | "exposedKey"
  | "valueDataKey"
  | "labelDataKey"
  | "iconDataKey"
  | "focusContainerOnBlur"
  | "onOptionSelected"
>;

const useHandleSelect = ({
  data,
  exposedKey,
  defaultDataValue,
  valueDataKey,
  iconDataKey,
  labelDataKey,
  focusContainerOnBlur,
  onOptionSelected,
}: HandleSelectArgs) => {
  const defaultOption = defaultDataValue ? data.find((option) => option[valueDataKey] === defaultDataValue) : undefined;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const resultTooltipContainerRef = React.useRef<HTMLDivElement | null>(null);
  const inputSearchRef = React.useRef<HTMLInputElement | null>(null);
  const [dynamicData, setDynamicData] = React.useState<typeof data>(data);
  const [shouldShowDropdownList, setShouldShowDropdownList] = React.useState<boolean>();
  const [searchText, setSearchText] = React.useState<string>((defaultOption?.[labelDataKey] as string) || "");
  const [focusedOption, setFocusedOption] = React.useState<
    (SelectProps["data"][number] & { idx: number }) | undefined
  >();
  const [selectedOption, setSelectedOption] = React.useState<PossibleOption>({
    key: exposedKey,
    label: (defaultOption?.[labelDataKey] as string) || "",
    value: defaultDataValue || "",
    icon: (iconDataKey && (defaultOption?.[iconDataKey] as React.ReactNode)) || undefined,
  });
  const id = React.useId();

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
      if (shouldShowDropdownList) dismissList();
    }, 300);
    focusContainerOnBlur && containerRef.current?.focus();
    setSearchText(selectedOption.label);
  };

  const onInputSearchKeyDown = (event: React.KeyboardEvent) => {
    if (!["Enter", "ArrowDown", "ArrowUp", "Escape"].includes(event.key)) return;
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
      if (dynamicData[focusedOption.idx + 1]) {
        setFocusedOption((prev) => ({ ...dynamicData[focusedOption.idx + 1], idx: prev!.idx + 1 }));
      } else {
        setFocusedOption({ ...dynamicData[0], idx: 0 });
      }
      document.querySelector('[data-focused="true"]')?.scrollIntoView();
      return;
    }
    if (event.key === "Escape") {
      if (!searchText) {
        inputSearchRef.current?.blur();
        event.preventDefault();
      }
    }
  };

  const onInputSearchClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (!shouldShowDropdownList) {
      setShouldShowDropdownList(true);
    }
    e.stopPropagation();
  };

  const dismissList = () => {
    setShouldShowDropdownList(false);
  };

  const onOptionPress = (option: SelectProps["data"][number]) => {
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

  const onOptionKeyDown = (event: React.KeyboardEvent, option: SelectProps["data"][number]) => {
    if (event.key === "Enter") {
      onOptionPress(option);
    }
  };

  const onLabelClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    inputSearchRef.current?.focus();
  };

  const onResultTooltipContainerMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    onOptionSelected?.({ key: selectedOption.key, label: selectedOption.label, value: selectedOption.value });
  }, [selectedOption, onOptionSelected]);

  React.useEffect(() => {
    !!dynamicData.length && setFocusedOption({ ...dynamicData[0], idx: 0 });
  }, [dynamicData]);

  return {
    id,
    containerRef,
    inputSearchRef,
    resultTooltipContainerRef,
    shouldShowDropdownList,
    searchText,
    selectedOption,
    focusedOption,
    dynamicData,
    onInputSearchBlur,
    onInputSearchChange,
    onInputSearchContainerClick,
    onInputSearchFocus,
    onInputSearchKeyDown,
    onInputSearchClick,
    onOptionPress,
    onOptionKeyDown,
    onLabelClick,
    onResultTooltipContainerMouseDown,
  };
};

export default useHandleSelect;
