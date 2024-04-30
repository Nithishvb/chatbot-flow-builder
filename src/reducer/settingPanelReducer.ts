import { ContextInitialStateTypes } from "../context/context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducer = (state: ContextInitialStateTypes, action: any) => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      return {
        ...state,
        isShowNodePanel: false,
        MessageToEdit: action.payload.messageId,
      };
    }
    case "REMOVE_MESSAGE":
      return { ...state, isShowNodePanel: true, MessageToEdit: "" };
    case "EDIT_NODE_MESSAGE": {
      const { id, message } = action.payload;

      // Map through the nodes array to find the node with the matching id
      const updatedNodes = state.nodes.map((node) => {
        // If the node ID matches the ID in the payload, update its data.label
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: message,
            },
          };
        }
        // Return the node unchanged if its ID doesn't match
        return node;
      });

      // Return the updated state with the modified nodes array
      return { ...state, nodes: updatedNodes };
    }
    case 'ADD_NODE': 
      return { ...state, nodes: [...state.nodes, action.payload.node] }
    case 'ADD_EDGES': 
      return { ...state, edges: action.payload.edges}
    case 'ADD_POSITION': 
      return { ...state, nodes: action.payload.nodes }
    default:
      return state;
  }
};
