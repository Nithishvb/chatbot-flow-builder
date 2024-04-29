import { useCallback } from "react";
import { useDrop } from "react-dnd";
import ReactFlow, {
  Background,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

type FlowBuilderPropTypes = {
  nodes: Node[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNodes: (val: any) => void;
  setIsShowNodePanel: (val: boolean) => void;
};

const Initaledges: Edge[] = [{ id: "1-2", source: "1", target: "2" }];

const FlowBuilder = ({ nodes, setNodes , setIsShowNodePanel }: FlowBuilderPropTypes) => {
  const [edges, setEdges] = useEdgesState(Initaledges);

  const [{ isOver }, drop] = useDrop({
    accept: "NODE_MESSAGE",
    drop: (item) => {
      console.log("Droppped Item", item);
      setNodes([
        ...nodes,
        {
          id: JSON.stringify(nodes.length + 1),
          position: {
            x: nodes[nodes.length - 1].position.x,
            y: nodes[nodes.length - 1].position.y + 100,
          },
          data: { label: "world" },
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
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
        onNodeClick={() => setIsShowNodePanel(false)}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
