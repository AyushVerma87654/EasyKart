import React, { memo } from "react";
import { ImSpinner6 } from "react-icons/im";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ImSpinner6 className="text-red-500 animate-spin text-7xl grow-1" />
    </div>
  );
}

export default memo(Loading);
