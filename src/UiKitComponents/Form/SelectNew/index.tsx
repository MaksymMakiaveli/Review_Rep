import React, { memo, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { StylesConfig } from 'react-select/dist/declarations/src/styles';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import InputContainer from '../../InputHelperBox';
import cl from 'classnames';
import './Select.scss';
import { genericMemo } from '@helpers/functions';

interface SelectProps<OptionsType, FieldType extends FieldValues = FieldValues>
  extends UseControllerProps<FieldType> {
  options: OptionsType[];
  optionValue: keyof OptionsType;
  optionLabel: keyof OptionsType;
  errors?: string;
  label?: string;
  isActive?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  getValue?: (value: number | string | undefined) => void;
}

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#032f5c' : undefined,
  }),
};

const MemoizedReactSelect = memo(ReactSelect);

const Select = <OptionsType, FieldType>(props: SelectProps<OptionsType, FieldType>) => {
  const {
    options,
    optionValue,
    optionLabel,
    errors,
    label = '',
    isRequired = false,
    isDisabled = false,
    isLoading = false,
    isActive = false,
    isClearable = false,
    getValue,
    ...rest
  } = props;

  const [value, setValue] = useState<number | string | undefined>(undefined);

  const transformedOptions = options.map((item) => ({
    value: item[optionValue],
    label: item[optionLabel],
  }));

  const correctErrorText = isDisabled ? '' : errors;
  const selectError = correctErrorText ? 'react-select-container__error' : '';
  const selectActive = isActive ? 'react-select-container__active' : '';

  useEffect(() => {
    if (getValue) {
      getValue(value);
    }
  }, [value]);

  return (
    <InputContainer id={rest.name} label={label} errorText={errors} required={isRequired}>
      <Controller
        {...rest}
        render={({ field }) => (
          <MemoizedReactSelect
            {...field}
            id={rest.name}
            options={transformedOptions}
            styles={customStyles}
            ref={field.ref}
            value={transformedOptions.find((item) => item.value === field.value)}
            onChange={(selected: any) => {
              if (selected) {
                field.onChange(selected.value);
                setValue(selected.value);
              } else {
                field.onChange(undefined);
                setValue(undefined);
              }
            }}
            maxMenuHeight={200}
            isLoading={isLoading}
            isDisabled={isDisabled}
            className={cl('react-select-container', selectError, selectActive)}
            classNamePrefix="react-select"
            isClearable={isClearable}
          />
        )}
      />
    </InputContainer>
  );
};

export default genericMemo(Select);
