import { FC } from "react";
import { Link } from "react-router-dom";

type PageButtonProps = {
  to: string;
  className: string;
  children: number;
};

const PageButton: FC<PageButtonProps> = ({ to, className, children }) => {
  return (
    <div className="w-12 mx-1 my-8 h-10">
      <Link
        to={to}
        className={"py-2 px-4 text-lg font-semibold w-full h-full " + className}
      >
        {children}
      </Link>
    </div>
  );
};

export default PageButton;
