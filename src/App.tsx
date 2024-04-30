import { useEffect, useState } from "react";
import "./App.css";
import FlowBuilder from "./Components/FlowBuilder/FlowBuilder";
import Header from "./Components/Header/Header";
import Nodepanel from "./Components/NodePanel/Nodepanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // or use another backend if needed
import { Node } from "reactflow";
import SettingPanel from "./Components/SettingPanel/SettingPanel";
import { useSettingPanel } from "./context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { state } = useSettingPanel();
  const [nodes, setNodes] = useState<Node[]>(state.nodes);

  useEffect(() => {
    setNodes(state.nodes);
  }, [state.nodes]);

  return (
    <>
      <Header />
      <div className="flex w-[100%]">
        <DndProvider backend={HTML5Backend}>
          <div className="w-[78%]">
            <FlowBuilder nodes={nodes} setNodes={setNodes} />
          </div>
          <div className="w-[22%]">
            {state && state?.isShowNodePanel ? <Nodepanel /> : <SettingPanel />}
          </div>
        </DndProvider>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          autoClose={2000}
          closeButton={false}
          className="text-center"
        />
      </div>
    </>
  );
}

export default App;
