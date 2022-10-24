import { useField } from "formik";
import Input from "./Input";
import React from "react";

function FormikInput({ name, ...rest }) {
  const [data, meta] = useField(name);

  const { error, touched } = meta;

  let border = "border-gray-300";

  if (touched && error) {
    border = "border-red-500";
  }

  return (
    <Input name={name} {...data} touched={touched} error={error} {...rest} />
  );
}

export default FormikInput;
