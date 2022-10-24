import React from "react";
import Other from "./Other";
import Last from "./Last";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Last />}></Route>
        <Route path="/result" element={<Other />}></Route>
      </Routes>
    </div>
  );
}

export default App;
