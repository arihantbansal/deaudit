import React, { useReducer, createContext, useContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_WEB3_PROVIDER":
        return {
          ...state,
          provider: action.provider,
          web3Provider: action.web3Provider,
          address: action.address,
          chainId: action.chainId,
        };
      case "SET_ADDRESS":
        return {
          ...state,
          address: action.address,
        };
      case "SET_CHAIN_ID":
        return {
          ...state,
          chainId: action.chainId,
        };
      case "RESET_WEB3_PROVIDER":
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export function useStateContext() {
  return useContext(StateContext);
}
