import { Handle, Node, Position } from "reactflow";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";

const CustomNodes = ({ data }: Node) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
      />
      <div className="border border-1 border-black w-[300px] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="bg-green-100 p-1 font-bold text-md rounded-t-lg pl-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiMessageRoundedDetail className="text-xs" />
            <span>Send Message</span>
          </div>
          <div className="mr-2 bg-green-200 p-1 text-center rounded-full">
            <IoLogoWhatsapp className="text-green-500 text-center text-xs" />
          </div>
        </div>
        <div className="p-3 bg-white rounded-b-lg font-semibold">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
        isConnectable={true}
      />
    </div>
  );
};

export default CustomNodes;
