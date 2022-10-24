import React from "react";

function Input({
  name,
  id,
  type,
  label,
  touched,
  errors,
  onBlur,
  onChange,
  values,
  autoComplete,
}) {
  let border = "border-gray-300";

  if (touched && errors) {
    border = "border-red-500";
  }

  return (
    <div>
      <div className="py-1">
        <label htmlFor={id} className="my-2">
          {label}
        </label>
      </div>

      <input
        name={name}
        id={id}
        type={type}
        values={values}
        onBlur={onBlur}
        onChange={onChange}
        autoComplete={autoComplete}
        className={
          "focus:outline-none rounded-md border-2 w-full px-3 h-12 focus:border-blue-500 " +
          border
        }
      />

      {touched && errors && <div className="text-red-500">{errors}</div>}
    </div>
  );
}

export default Input;
