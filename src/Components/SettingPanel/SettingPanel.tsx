import { IoMdArrowRoundBack } from "react-icons/io";

type SettingPanelPropTypes = {
  setIsShowNodePanel: (val: boolean) => void;
};

const SettingPanel = ({ setIsShowNodePanel } : SettingPanelPropTypes) => {
  return (
    <div className="flex-1 border border-2 border-gray-300 h-[100%]">
      <div className="flex items-center p-3 border border-b-2 border-gray-300">
        <div className="cursor-pointer" onClick={() => setIsShowNodePanel(true)}>
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
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SettingPanel;
