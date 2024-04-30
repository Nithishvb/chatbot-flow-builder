import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/settingPanelReducer";
import { Edge, Node, Position } from "reactflow";

export type ContextInitialStateTypes = {
  nodes: Node[];
  isShowNodePanel: boolean;
  MessageToEdit: string;
  edges: Edge[];
};

export type Action =
  | { type: "ADD_MESSAGE" }
  | { type: "REMOVE_MESSAGE" }
  | { type: "EDIT_NODE_MESSAGE" }
  | { type: "ADD_NODE" }
  | { type: "ADD_EDGES" }
  | { type: "ADD_POSITION" };

// Define an initial state
const initialState: ContextInitialStateTypes = {
  nodes: [
    {
      id: "1",
      position: { x: 500, y: 200 },
      data: { label: "Hello" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type: "selectorNode",
    },
  ],
  isShowNodePanel: true,
  MessageToEdit: "",
  edges: [],
};

// Define a reducer function to handle state updates

// Create a context
const SettingPanelContext = createContext<{
  state: ContextInitialStateTypes;
  dispatch: React.Dispatch<Action>;
}>();

// Create a custom hook to use the context
export const useSettingPanel = () => useContext(SettingPanelContext);

// Create a provider component to wrap your app
export const SettingPanelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingPanelContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingPanelContext.Provider>
  );
};
