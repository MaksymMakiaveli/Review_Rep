import React, { memo } from 'react';
import cl from 'classnames';
import './Button.scss';

type Variant = 'primary' | 'secondary' | 'outline' | 'unbordered' | 'iconButton';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, variant, icon, type = 'button', ...rest } = props;

  let classVariant: string;
  switch (variant) {
    case 'primary':
      classVariant = 'button-primary';
      break;
    case 'secondary':
      classVariant = 'button-secondary';
      break;
    case 'outline':
      classVariant = 'button-outline';
      break;
    case 'unbordered':
      classVariant = 'button-unbordered';
      break;
    case 'iconButton':
      classVariant = 'button-iconButton';
      break;
    default:
      classVariant = '';
  }

  return (
    <button className={cl('button', classVariant)} type={type} {...rest}>
      {icon ? <span className="icon">{icon}</span> : null}
      {children}
    </button>
  );
};

export default memo(Button);
