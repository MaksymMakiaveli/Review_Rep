import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import InputContainer from '../InputHelperBox';
import { TSelectValue } from '@Types/application.types';
import { CustomSelectProps } from './SelectType';
import cl from 'classnames';
import './CustomSelect.scss';

const PureReactSelect = React.memo(Select);
const PureInputContainer = React.memo(InputContainer);

const CustomSelect = <FieldType,>(props: CustomSelectProps<FieldType>) => {
  const {
    errorText,
    statusActive,
    label,
    placeholder,
    id,
    options,
    optionValue,
    optionLabel,
    required,
    isLoading,
    isDisabled,
    defaultValue,
    name,
    setValue,
    getSelectValue,
    ...rest
  } = props;
  const [valueSelect, setValueSelect] = useState<TSelectValue<number>>();

  const selectError = errorText ? 'react-select-container__error' : '';
  const selectActive = statusActive ? 'react-select-container__active' : '';

  const getOptions: any[] = useMemo(() => {
    return options.map((option) => ({
      value: option[optionValue],
      label: option[optionLabel],
    }));
  }, [options]);

  useEffect(() => {
    if (getSelectValue && valueSelect) {
      getSelectValue(valueSelect);
    }
  }, [valueSelect]);
  useEffect(() => {
    if (setValue && defaultValue) {
      setValue(name, defaultValue);
    }
  }, [setValue, defaultValue]);

  return (
    <PureInputContainer
      label={label}
      id={id}
      errorText={errorText}
      required={required}
      disabled={isDisabled}
    >
      <Controller
        name={name}
        {...rest}
        render={({ field: { onChange, ref } }) => (
          <PureReactSelect
            defaultValue={defaultValue}
            ref={ref}
            placeholder={placeholder}
            className={cl('react-select-container', selectError, selectActive)}
            classNamePrefix="react-select"
            options={getOptions}
            isLoading={isLoading}
            isDisabled={isDisabled}
            onChange={(value) => {
              onChange(value);
              setValueSelect(value as TSelectValue<number>);
            }}
          />
        )}
      />
    </PureInputContainer>
  );
};

export default CustomSelect;
