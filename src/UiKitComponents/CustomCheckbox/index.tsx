import React from 'react';
import { Checkbox } from 'rsuite';
import { CheckboxProps } from 'rsuite/esm/Checkbox/Checkbox';
import './CustomCheckbox.scss';

interface CustomCheckboxProps extends CheckboxProps {}

const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { ...rest } = props;
  return <Checkbox {...rest} className="custom_checkbox" />;
};
export default React.memo(CustomCheckbox);
