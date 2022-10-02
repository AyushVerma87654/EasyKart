import { useField } from "formik";
import React from "react";

function FormikHoc(IncomingComponent) {
  function OutgoingComponent({ name, ...rest }) {
    const [data, meta] = useField(name);

    console.log(data);

    const { error, touched } = meta;

    let border = "border-gray-300";

    if (touched && error) {
      border = "border-red-500";
    }

    return (
      <IncomingComponent
        name={name}
        {...data}
        touched={touched}
        error={error}
        {...rest}
      />
    );
  }

  return OutgoingComponent;
}

export default FormikHoc;
