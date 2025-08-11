import React from 'react';
import './Button.scss';

type Props = Pick<
  React.ComponentProps<'button'>,
  'children' | 'onClick' | 'disabled' | 'className' | 'aria-label'
> & {
  variant?: 'primary' | 'secondary' | 'nav';
  size?: 'small' | 'medium' | 'large';
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  variant,
  size,
  className,
  'aria-label': ariaLabel,
}) => {
  const buttonClasses = [
    'button',
    `button--${variant || 'primary'}`,
    `button--${size || 'medium'}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
