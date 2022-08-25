import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import MainContainer from "./components/MainContainer.jsx";
import CreateContainer from "./components/CreateContainer.jsx";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/create-item" element={<CreateContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
