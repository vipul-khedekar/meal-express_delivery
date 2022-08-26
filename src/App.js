import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import MainContainer from "./components/MainContainer.jsx";
import AdminControls from "./components/AdminControls";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/create-item" element={<AdminControls />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
