import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Other from "./Other";

function Last() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  if (input == "play" && loading) {
    console.log(input);
    return <Navigate to="/result" />;
  }
  const handleChange = (event) => {
    setLoading(false);
    setInput(event.target.value);
  };
  const handleC = () => {
    console.log("cccc");
    return <Link to="/result" />;
  };
  const handleClick = () => {
    setLoading(true);
  };
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <div className="text-3xl text-green-500 font-bold">
          Guess my favourite hobby?
        </div>
        <input
          className="border-4 focus:outline-none h-10 p-2 border-blue-500 focus:border-red-500"
          value={input}
          placeholder="Enter here"
          onChange={handleChange}
        />
        <button
          className="bg-red-500 font-bold text-semibold text-xl text-blue-700 h-10 w-20 flex items-center justify-center"
          onClick={handleClick}
        >
          Enter
        </button>
        <Link to="/result">
          <button
            className="bg-red-500 font-bold text-semibold text-xl text-blue-700 h-10 w-20 flex items-center justify-center"
            onClick={handleC}
          >
            Other
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Last;
