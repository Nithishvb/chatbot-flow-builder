import { useDrag } from "react-dnd";

const Nodepanel = () => {
  const [{ isDragging }, drag] = useDrag({
    type: "NODE_MESSAGE",
    item: { Nodemessage: "Nodemessage" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="flex-1 border border-2 border-gray-300 h-[100%]">
      <div className="flex items-center flex-wrap gap-2 p-2">
        <div
          className="text-blue-400 border border-1 border-blue-500 py-4 px-10 rounded-md cursor-pointer"
          ref={drag}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          Message
        </div>
      </div>
    </div>
  );
};

export default Nodepanel;
