import React from "react";

const Input = React.forwardRef(
  ({ name, type, placeholder, className, ...props }, ref) => {
    return (
      <input
        name={name}
        className={`my-3 mb-3 block w-72 appearance-none rounded  border p-3 px-4 py-3 leading-tight ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
