import { InputHelperBoxProps } from '../InputHelperBox/InputHelperBoxType';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface TextFieldProps<FieldType extends FieldValues = FieldValues>
  extends Omit<InputHelperBoxProps, 'children'>,
    UseControllerProps<FieldType> {
  maxLength: number;
  placeholder?: string;
}
