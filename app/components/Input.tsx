import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn, ControllerRenderProps } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  field?: ControllerRenderProps;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  register,
  field,
  ...rest
}) => {
  return (
    <input
      type={type}
      {...(register ? register : field)}
      {...rest}
      className="outline-none p-2 border rounded-md shadow-sm w-full"
    />
  );
};

export default Input;
