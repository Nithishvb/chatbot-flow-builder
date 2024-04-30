import { IoMdArrowRoundBack } from "react-icons/io";
import { useSettingPanel } from "../../context/context";
import { useEffect, useState } from "react";
import { getMessageById } from "../../utils/getMessageById";

const SettingPanel = () => {
  const { state, dispatch } = useSettingPanel();
  const [message, setMessage] = useState<string>(
    getMessageById(state.nodes, state.MessageToEdit)
  );

  useEffect(() => {
    setMessage(getMessageById(state.nodes, state.MessageToEdit));
  }, [state.nodes, state.MessageToEdit]);

  return (
    <div className="flex-1 border border-2 border-gray-300 h-[100%]">
      <div className="flex items-center p-3 border border-b-2 border-gray-300">
        <div
          className="cursor-pointer"
          onClick={() =>
            dispatch({
              type: "REMOVE_MESSAGE",
            })
          }
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="flex justify-center w-[80%] font-semibold">Message</div>
      </div>
      <div className="p-3 border-b-2 border-gray-300">
        <div className="mt-3 text-gray-300 font-semibold">Text</div>
        <div className="mt-3">
          <textarea
            name="message_text"
            id=""
            cols={37}
            rows={3}
            className="border border-1 border-gray-200 rounded-lg p-2"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              dispatch({
                type: "EDIT_NODE_MESSAGE",
                payload: {
                  message: e.target.value,
                  id: state.MessageToEdit,
                },
              });
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SettingPanel;
