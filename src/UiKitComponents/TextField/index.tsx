import React, { useState } from 'react';
import { TextFieldProps } from './TextFieldType';
import { Controller } from 'react-hook-form';
import InputHelperBox from '../InputHelperBox';
import './TextField.scss';

const TextField = <TextFieldType,>(props: TextFieldProps<TextFieldType>) => {
  const { label, id, errorText, disabled, name, placeholder, required, maxLength, ...rest } = props;

  const [valueLength, setValueLength] = useState<number>(0);

  const updateLength = (value: string) => {
    const length = value.length;

    setValueLength(length);
  };

  return (
    <InputHelperBox
      label={label}
      id={id}
      errorText={errorText}
      required={required}
      disabled={disabled}
    >
      <span className="textarea_length">
        {valueLength}&nbsp;/&nbsp;{maxLength}
      </span>
      <Controller
        name={name}
        {...rest}
        render={({ field: { onChange } }) => (
          <textarea
            className="custom_textarea"
            onChange={(event) => {
              onChange(event.target.value);
              updateLength(event.target.value);
            }}
            placeholder={placeholder}
          />
        )}
      />
    </InputHelperBox>
  );
};

export default TextField;
