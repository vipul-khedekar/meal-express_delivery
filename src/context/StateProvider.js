import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export function StateProvider(props) {
  const { reducer, initialState, children } = props;

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext);
}
