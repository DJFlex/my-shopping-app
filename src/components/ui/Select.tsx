import React from 'react';

type SelectProps = {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  children,
  className = '',
  required = false,
  disabled = false,
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      } ${className}`}
      required={required}
      disabled={disabled}
    >
      {children}
    </select>
  );
};

export default Select;
