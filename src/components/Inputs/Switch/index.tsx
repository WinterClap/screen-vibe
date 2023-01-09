import React from "react";
import { InputCheckbox, SwitchContainer, Thumb } from "./styles";

export type SwitchState = { [key: string]: boolean };
type Props = {
  name: string;
  defaultState?: boolean;
  onStateChange?: (state: SwitchState) => void;
};

const Switch = ({ name, defaultState = false, onStateChange }: Props) => {
  const [state, setState] = React.useState<boolean>(defaultState);
  const labelRef = React.useRef<HTMLLabelElement>(null);

  const onSwitchKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      labelRef.current?.click();
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setState((prev) => !prev);
    onStateChange?.({ [e.target.name]: e.target.checked });
  };

  return (
    <label ref={labelRef} tabIndex={0} onKeyDown={onSwitchKeyDown}>
      <SwitchContainer $isOn={state}>
        <InputCheckbox type="checkbox" aria-checked={state} name={name} checked={state} onChange={onChange} />
        <Thumb layout $isOn={state} />
      </SwitchContainer>
    </label>
  );
};

export default Switch;
