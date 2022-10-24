import React, { memo } from "react";

function Footer() {
  return (
    <div>
      <div className="bg-gray-800 text-gray-100 flex justify-between px-12 h-20 text-sm items-center py-1">
        <p>AYUSH @ 2022 | Codeyogi</p>
        <p>Powered By Ayush</p>
      </div>
    </div>
  );
}

export default memo(Footer);
