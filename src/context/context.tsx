import React, { ReactNode, createContext, useContext, useReducer } from "react";

type ContextInitialStateTypes = {
  isShowNodePanel: boolean;
  MessageToEdit: string;
};

type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

// Define an initial state
const initialState: ContextInitialStateTypes = {
  isShowNodePanel: true,
  MessageToEdit: "",
};

// Define a reducer function to handle state updates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: ContextInitialStateTypes, action: any) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, MessageToEdit: action.payload.message };
    case "REMOVE_MESSAGE":
      return { ...state, MessageToEdit: "" };
    default:
      return state;
  }
};

// Create a context
const SettingPanelContext = createContext<
  | { state: ContextInitialStateTypes; dispatch: React.Dispatch<Action> }
  | undefined
>(undefined);

// Create a custom hook to use the context
export const useSettingPanel = () => useContext(SettingPanelContext);

// Create a provider component to wrap your app
export const CounterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingPanelContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingPanelContext.Provider>
  );
};
