import React from 'react';
import classes from './Button.module.scss';
import cl from 'classnames';
import { ButtonProps } from './ButtonType';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant, iconElement, type = 'button', ...rest } = props;
  const styleButton =
    variant === 'primary'
      ? classes.button_primary
      : variant === 'secondary'
      ? classes.button_secondary
      : variant === 'outline'
      ? classes.button_outline
      : variant === 'icon'
      ? classes.button_icon
      : '';

  return (
    <button className={cl(classes.button, styleButton)} type={type} {...rest}>
      {iconElement ? <span className={classes.icon}>{iconElement}</span> : null}
      {children}
    </button>
  );
};

export default Button;
