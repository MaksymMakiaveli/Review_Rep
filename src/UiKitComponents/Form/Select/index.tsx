import React, { useEffect, useMemo, useState } from 'react';

import { TSelectValue } from '@Types/application.types';
import cl from 'classnames';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

import InputContainer from '../../InputHelperBox';
import { SelectProps } from './SelectType';

import './Select.scss';

const PureReactSelect = React.memo(ReactSelect);
const PureInputContainer = React.memo(InputContainer);

const Select = <FieldType,>(props: SelectProps<FieldType>) => {
  const {
    errorText,
    isActive,
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
    getSelectValue,
    ...rest
  } = props;
  const [valueSelect, setValueSelect] = useState<TSelectValue<number>>();

  const correctErrorText = isDisabled ? '' : errorText;
  const selectError = correctErrorText ? 'react-select-container__error' : '';
  const selectActive = isActive ? 'react-select-container__active' : '';

  const getOptions: TSelectValue<number>[] = useMemo(() => {
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

  return (
    <PureInputContainer
      label={label}
      id={id}
      errorText={correctErrorText}
      required={required}
      disabled={isDisabled}
    >
      <Controller
        name={name}
        defaultValue={defaultValue}
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
            maxMenuHeight={200}
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

export default Select;
