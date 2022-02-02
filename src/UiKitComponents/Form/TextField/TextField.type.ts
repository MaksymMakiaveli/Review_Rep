import { InputHelperBoxProps } from '../../InputHelperBox/InputHelperBoxType';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextFieldProps
  extends Omit<InputHelperBoxProps, 'children'>,
    Partial<UseFormRegisterReturn> {
  label: string;
  id: string;
  placeholder: string;
  type?: 'password' | 'text' | 'number';
  defaultValue?: string | number;
}

export default TextFieldProps;
