import { FC, InputHTMLAttributes } from "react";

type InputProps = {
  labelId?: string;
  label?: string;
  touched?: string;
  errors?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  label,
  touched,
  errors,
  labelId,
  ...rest
}) => {
  let border = "border-gray-300";

  if (touched && errors) {
    border = "border-red-500";
  }

  return (
    <div>
      <div className="py-1">
        <label htmlFor={labelId} className="my-2">
          {label}
        </label>
      </div>

      <input
        {...rest}
        className={
          "focus:outline-none rounded-md border-2 w-full px-3 h-12 focus:border-blue-500 " +
          border
        }
      />

      {touched && errors && <div className="text-red-500">{errors}</div>}
    </div>
  );
};

export default Input;
