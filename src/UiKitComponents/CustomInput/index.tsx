import React, { memo } from 'react';
import './CustomInput.scss';
import cl from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputHelperBox from '../InputHelperBox';

interface CustomInputProps {
  label: string;
  id: string;
  placeholder: string;
  type?: 'password' | 'text' | 'number';
  errorText?: string;
  statusActive?: boolean;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
}
const PureInputHelperBox = React.memo(InputHelperBox);

const CustomInput = React.forwardRef<
  HTMLInputElement,
  Partial<UseFormRegisterReturn> & CustomInputProps
>((props, ref) => {
  const {
    label,
    id,
    statusActive,
    errorText,
    required,
    placeholder,
    type = 'text',
    disabled = false,
    defaultValue,
    ...rest
  } = props;

  const activeInput = statusActive ? 'custom-input__active' : '';
  const errorInput = errorText ? 'custom-input__error' : '';

  return (
    <PureInputHelperBox
      label={label}
      id={id}
      required={required}
      errorText={errorText}
      disabled={disabled}
    >
      <input
        id={id}
        placeholder={placeholder}
        ref={ref}
        type={type}
        className={cl('custom-input', activeInput, errorInput)}
        disabled={disabled}
        defaultValue={defaultValue}
        {...rest}
      />
    </PureInputHelperBox>
  );
});

export default memo(CustomInput);
