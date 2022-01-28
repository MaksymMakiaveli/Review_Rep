import { FieldValues, UseControllerProps } from 'react-hook-form';
import { InputHelperBoxProps } from '../InputHelperBox/InputHelperBoxType';
import { TSelectValue } from '@Types/application.types';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';

export interface CustomSelectProps<FieldType extends FieldValues = FieldValues>
  extends UseControllerProps<FieldType>,
    InputHelperBoxProps {
  options: any[];
  optionValue: string;
  optionLabel: string;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  getSelectValue?: (value: TSelectValue<number>) => void;
  setValue?: UseFormSetValue<FieldType>;
}
