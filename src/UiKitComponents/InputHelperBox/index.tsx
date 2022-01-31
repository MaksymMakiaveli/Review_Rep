import React, { memo } from 'react';
import cl from 'classnames';
import './InputContainer.scss';
import { InputHelperBoxProps } from './InputHelperBoxType';

const InputHelperBox = (props: InputHelperBoxProps) => {
  const { label, errorText, id, required, disabled = false, children } = props;

  const IsRequired = required ? '*' : '';
  const Error = errorText && !disabled ? 'custom-input-container__error' : '';
  const Disabled = disabled ? 'custom-input-container__disabled' : '';

  return (
    <div className={cl('custom-input-container', Error)}>
      {errorText ? <p className="custom-input-container__errorText">{errorText}</p> : null}
      {children}
      <label htmlFor={id} className={cl('custom-input-container__label', Disabled)}>
        {label}
        <span>{IsRequired}</span>
      </label>
    </div>
  );
};
export default memo(InputHelperBox);
