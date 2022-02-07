import React, { useEffect, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import { Controller } from 'react-hook-form';
import InputContainer from '../../InputHelperBox';
import { TSelectValue } from '@Types/application.types';
import { SelectProps } from './SelectType';
import cl from 'classnames';
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

  const selectError = errorText ? 'react-select-container__error' : '';
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
      errorText={errorText}
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
