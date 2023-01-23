import React from "react";
import { InputContainer, InputTypeNumber } from "./styles";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { maxWidth?: string };

const InputNumber = ({ maxWidth, ...inputProps }: Props) => {
  return (
    <InputContainer $maxWidth={maxWidth}>
      <InputTypeNumber {...inputProps} type="number" />
    </InputContainer>
  );
};

export default InputNumber;
