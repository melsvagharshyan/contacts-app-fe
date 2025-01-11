import { FC } from 'react';
import clsx from 'clsx';
import ValidationInfo from '../ValiadtionInfo/ValiadtionInfo';

interface InputFieldProps {
  field: any;
  placeholder?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label: string;
  required?: boolean;
}

const TextInput: FC<InputFieldProps> = ({
  field,
  placeholder,
  name,
  value,
  onChange,
  className = '',
  label,
  required = false,
}) => {
  const inputStyles = clsx(
    'w-full p-3 border border-blue-light rounded-lg focus:ring-1 focus:ring-blue-focus focus:outline-none bg-gray-light text-black-text',
    className,
  );
  return (
    <>
      <label className="block text-start text-sm font-normal text-blue-500 mb-1 ">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyles}
      />
      <ValidationInfo field={field} />
    </>
  );
};

export default TextInput;
