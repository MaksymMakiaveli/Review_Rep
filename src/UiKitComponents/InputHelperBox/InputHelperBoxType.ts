import React from 'react';

export interface InputHelperBoxProps {
  label: string;
  id: string;
  children?: React.ReactNode;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}
