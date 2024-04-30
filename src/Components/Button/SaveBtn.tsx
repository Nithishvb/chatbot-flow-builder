import { toast } from "react-toastify";
import { useSettingPanel } from "../../context/context";
import { Edge } from "reactflow";

const SaveBtn = () => {
  const { state , dispatch } = useSettingPanel();

  const handleSaveBtn = () => {
    if (isValidFlow(state.edges)) {
      toast.success("Changes saved");
    } else {
      toast.error("Cannot save Flow");
    }
    dispatch({
      type: 'CLOSE_SETTING_PANEL'
    })
  };

  const isValidFlow = (data: Edge[]) => {
    const targetSet = new Set();
    const sourceSet = new Set();
    let nodesCount: number = 0;

    // Iterate through each object in the data array
    for (const { source, target } of data) {
      targetSet.add(target);
      sourceSet.add(source);
    }

    for (const val of state.nodes) {
      if (!targetSet.has(val.id)) {
        nodesCount += 1;
      }
    }

    // return true if there is only one empty target handles otherwise return false
    return nodesCount <= 1;
  };

  return (
    <div className="mr-[60px]">
      <button
        className="bg-white border rounded-md border-1 border-blue-600 text-blue-800 font-medium py-2 px-8"
        onClick={handleSaveBtn}
      >
        Save Changes
      </button>
    </div>
  );
};

export default SaveBtn;
