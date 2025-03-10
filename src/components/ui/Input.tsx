import React from 'react';

type InputProps = {
  id?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  required = false,
  min,
  max,
  step,
  disabled = false,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      } ${className}`}
      required={required}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    />
  );
};

export default Input;
