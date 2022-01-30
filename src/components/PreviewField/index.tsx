import React from 'react';
import classes from './PreviewFiled.module.scss';
import cl from "classnames";

interface PreviewFieldProps {
  label: string;
  description: string | number;
  variant?: 'input' | 'textField'
}

const PreviewField: React.FC<PreviewFieldProps> = (props) => {
  const { label, description, variant = 'input' } = props;

  const variantTextField = variant === 'textField' && classes.field_textField

  return (
    <div className={cl(classes.field, variantTextField)}>
      <label className={classes.field_label}>{label}</label>
      <p className={classes.field_description}>{description}</p>
    </div>
  );
};

export default PreviewField;
