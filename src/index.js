import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import { reducer } from "./context/reducer";

const root = document.querySelector(`#root`);

ReactDOM.render(
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </BrowserRouter>,
  root
);
