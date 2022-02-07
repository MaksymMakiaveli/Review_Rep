import React, { useState } from 'react';
import { TextAreaProps } from './TextArea.type';
import InputHelperBox from '../../InputHelperBox';
import './TextArea.scss';
import cl from 'classnames';

// const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
//   const {
//     label,
//     id,
//     errorText,
//     disabled,
//     placeholder,
//     required,
//     maxLength = 150,
//     isActive,
//     defaultValue,
//     ...rest
//   } = props;
//
//   const [valueLength, setValueLength] = useState<number>(0);
//
//   const activeTextArea = isActive ? 'custom_textarea_active' : '';
//
//   const updateLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const length = event.target.value.length;
//     setValueLength(length);
//   };
//
//   console.log(updateLength);
//   return (
//     <InputHelperBox
//       label={label}
//       id={id}
//       errorText={errorText}
//       required={required}
//       disabled={disabled}
//     >
//       <span className="textarea_length">
//         {valueLength}&nbsp;/&nbsp;{maxLength}
//       </span>
//       <textarea
//         className={cl('custom_textarea', activeTextArea)}
//         id={id}
//         ref={ref}
//         placeholder={placeholder}
//         maxLength={maxLength}
//         defaultValue={defaultValue}
//         {...rest}
//       />
//     </InputHelperBox>
//   );
// });
//
// export default TextArea;

import { Controller } from 'react-hook-form';

const TextField = <TextFieldType,>(props: TextAreaProps<TextFieldType>) => {
  const {
    label,
    id,
    errorText,
    disabled,
    name,
    placeholder,
    required,
    maxLength = 150,
    isActive,
    defaultValue,
    ...rest
  } = props;

  const [valueLength, setValueLength] = useState<number>(0);

  const activeTextArea = isActive ? 'custom_textarea_active' : '';

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
        defaultValue={defaultValue}
        {...rest}
        render={({ field: { onChange } }) => (
          <textarea
            defaultValue={defaultValue as string}
            className={cl('custom_textarea', activeTextArea)}
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
