import { useField } from "formik";
import React from "react";

function Input({ name, id, label, required, ...rest }) {
  const [data, meta] = useField(name);
  //   const {value , onBlur , onChange} = data;
  const { error, touched } = meta;
  console.log(required);

  let border = "border-gray-300";

  if (touched && error) {
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
        id={id}
        name={name}
        {...data}
        {...rest}
        className={
          "focus:outline-none rounded-md border-2 w-full px-3 h-12 focus:border-blue-500 " +
          border
        }
      />

      {touched && error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default Input;
