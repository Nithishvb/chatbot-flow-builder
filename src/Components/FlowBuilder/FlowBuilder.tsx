import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import ReactFlow, {
  Background,
  Node,
  Edge,
  applyNodeChanges,
  addEdge,
  useEdgesState,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSettingPanel } from "../../context/context";
import CustomNodes from './CustomNodes/CustomNodes'

type FlowBuilderPropTypes = {
  nodes: Node[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNodes: (val: any) => void;
};

type Connection = {
  source: string;
  target: string;
}

const Initaledges: Edge[] = [];

const nodeTypes = {
  selectorNode: CustomNodes,
};

const FlowBuilder = ({ nodes, setNodes }: FlowBuilderPropTypes) => {
  const [edges, setEdges , onEdgesChange] = useEdgesState(Initaledges);
  const { state , dispatch } = useSettingPanel();
  const [connections, setConnections] = useState<Connection[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: "NODE_MESSAGE",
    drop: () => {
      dispatch({
        type: 'ADD_NODE',
        payload: {
          node: {
            id: JSON.stringify(nodes.length + 1),
            position: {
              x: nodes[nodes.length - 1].position.x,
              y: nodes[nodes.length - 1].position.y + 100,
            },
            data: { label: "New Message" },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            type: 'selectorNode'
          }
        }
      })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const onNodesChange = useCallback(
    (changes) => {
      dispatch({
        type: 'ADD_POSITION',
        payload: {
          nodes: applyNodeChanges(changes, state.nodes)
        }
      })
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [nodes]
  );

  const onConnect = useCallback(
    (connection) => {
      const sourceNodeHasConnection = connections.some((conn) => conn.source === connection.source);
      if (sourceNodeHasConnection) {
        // Prevent creation of new edge
        return null;
      }
      
      setConnections([...connections, { source: connection.source, target: connection.target }]);
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
      dispatch({
        type: 'ADD_EDGES',
        payload: {
          edges: addEdge(edge, edges)
        }
      })
    },
    [connections, setEdges]
  );

  return (
    <div
      className="flex-1 h-[91vh]"
      ref={drop}
      style={{ backgroundColor: isOver ? "#D9E5D8" : "transparent" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(e, node) => {
          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              messageId: node.id,
            },
          });
        }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
