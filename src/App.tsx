import { useState } from "react";
import "./App.css";
import FlowBuilder from "./Components/FlowBuilder/FlowBuilder";
import Header from "./Components/Header/Header";
import Nodepanel from "./Components/NodePanel/Nodepanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // or use another backend if needed
import { Node } from "reactflow";
import SettingPanel from "./Components/SettingPanel/SettingPanel";

function App() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      position: { x: 500, y: 200 },
      data: { label: "Hello" },
    },
  ]);
  const [isShowNodePanel, setIsShowNodePanel] = useState<boolean>(true);

  return (
    <>
      <Header />
      <div className="flex w-[100%]">
        <DndProvider backend={HTML5Backend}>
          <div className="w-[78%]">
            <FlowBuilder nodes={nodes} setNodes={setNodes} setIsShowNodePanel={setIsShowNodePanel} />
          </div>
          <div className="w-[22%]">
            {isShowNodePanel ? <Nodepanel /> : <SettingPanel setIsShowNodePanel={setIsShowNodePanel} />}
          </div>
        </DndProvider>
      </div>
    </>
  );
}

export default App;
