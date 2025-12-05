import clsx from "clsx";
import React from "react";

interface InputFieldProps {
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  children: React.ReactNode;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  type = "text",
  name,
  children,
  placeholder,
  error,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="w-full space-y-1">
      <div className="relative w-full">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="peer
          w-full bg-transparent text-gray-900 dark:text-gray-100
          border-b border-gray-300 dark:border-gray-700
          py-3 pl-10 pr-3 text-base outline-none
          placeholder-gray-400 dark:placeholder-gray-500
          focus:border-blue-500 focus:ring-1 focus:ring-blue-300
          rounded-lg transition-all duration-200
        "
        />
        {children && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100">
            {children}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
