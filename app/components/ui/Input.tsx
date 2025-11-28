import React from "react";

interface InputFieldProps {
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  type = "text",
  name,
  children,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className=" peer
          w-full bg-transparent text-gray-900 dark:text-gray-100
          border-b border-gray-300 dark:border-gray-700
          py-3 pl-10 pr-3 text-base outline-none
          placeholder-gray-400 dark:placeholder-gray-500
          focus:border-blue-500 focus:ring-1 focus:ring-blue-300
          rounded-lg transition-all duration-200
        "
      />
      {children}
    </div>
  );
};

export default Input;
