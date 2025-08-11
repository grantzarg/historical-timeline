import React from 'react';
import './Button.scss';

type Props = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'nav';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
};

const Button: React.FC<Props> = ({ 
  variant = 'primary', 
  size = 'medium', 
  className, 
  icon, 
  ...buttonProps 
}) => {
  
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      {...buttonProps}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {buttonProps.children}
    </button>
  );
};

export default Button;
