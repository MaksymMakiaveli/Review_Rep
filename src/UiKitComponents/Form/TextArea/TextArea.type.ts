import { FieldValues, UseControllerProps } from 'react-hook-form';

import { InputHelperBoxProps } from '../../InputHelperBox/InputHelperBoxType';

export interface TextAreaProps<FieldType extends FieldValues = FieldValues>
  extends Omit<InputHelperBoxProps, 'children'>,
    UseControllerProps<FieldType> {
  maxLength?: number;
  placeholder?: string;
}
