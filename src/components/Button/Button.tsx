import clsx from 'clsx';
import Spinner from '../Spinner/Spinner';
import { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  variant: 'edit' | 'delete' | 'primary';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  text,
  variant,
  className = '',
  loading = false,
  disabled = false,
  type = 'button',
  size = 'medium',
  fullWidth = false,
}) => {
  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-sm',
  };

  const buttonStyles = clsx(
    'font-medium rounded-lg shadow-md transition border border-gray-100',
    {
      'text-blue-600 bg-white hover:bg-blue-100': variant === 'edit',
      'text-red-600 bg-white hover:bg-red-100': variant === 'delete',
      'text-white bg-blue-600 hover:bg-blue-700': variant === 'primary',
    },
    sizeStyles[size],
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled || loading,
    },
    className,
  );

  return (
    <button onClick={onClick} className={buttonStyles} disabled={disabled || loading} type={type}>
      {loading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
