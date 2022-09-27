import React from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <div className="flex flex-col items-center m-4">
        <img src="https://img.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg?size=338&ext=jpg&ga=GA1.2.2113721379.1664168063" />
        <Link
          to="/"
          className="bg-yellow-300 text-blue-500 font-semibold text-xl p-2 m-4 rounded-md"
        >
          Back To Home Page
        </Link>
      </div>
      <Link to="/product/100" className="flex items-center">
        <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
        Back to Last Product
      </Link>
    </div>
  );
}

export default PageNotFound;
