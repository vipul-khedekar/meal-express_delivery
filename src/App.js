import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import MainContainer from "./components/MainContainer.jsx";
import AdminControls from "./components/AdminControls";
import { fetchFoodItems } from "./utils/firebaseFunctions.js";
import { useStateValue } from "./context/StateProvider.js";
import { actionType } from "./context/reducer.js";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  async function fetchData() {
    const response = await fetchFoodItems();
    dispatch({
      type: actionType.SET_USER,
      user: JSON.parse(localStorage.getItem(`user`)),
    });
    dispatch({ type: actionType.SET_FOOD_ITEMS, foodItems: response });
  }

  useEffect(() => {
    fetchData();
  }, []);

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
