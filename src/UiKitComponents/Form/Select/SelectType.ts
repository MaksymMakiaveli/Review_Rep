import { FieldValues, UseControllerProps } from 'react-hook-form';
import { InputHelperBoxProps } from '../../InputHelperBox/InputHelperBoxType';
import { TSelectValue } from '@Types/application.types';

export interface SelectProps<FieldType extends FieldValues = FieldValues>
  extends UseControllerProps<FieldType>,
    InputHelperBoxProps {
  options: any[];
  optionValue: string;
  optionLabel: string;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  getSelectValue?: (value: TSelectValue<number>) => void;
}
