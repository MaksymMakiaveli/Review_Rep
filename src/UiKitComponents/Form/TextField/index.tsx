import React, { memo } from 'react';
import './TextField.scss';
import cl from 'classnames';
import InputHelperBox from '../../InputHelperBox';
import TextFieldProps from './TextField.type';

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    label,
    id,
    isActive,
    errorText,
    required,
    placeholder,
    type = 'text',
    disabled = false,
    defaultValue,
    ...rest
  } = props;

  const activeInput = isActive ? 'custom-input__active' : '';
  const errorInput = errorText ? 'custom-input__error' : '';

  return (
    <InputHelperBox
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
    </InputHelperBox>
  );
});

export default memo(TextField);
