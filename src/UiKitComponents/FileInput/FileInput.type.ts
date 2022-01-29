import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface FileInputProps<FieldType extends FieldValues = FieldValues>
  extends UseControllerProps<FieldType> {
  getFiles: (files: File[]) => void;
}
