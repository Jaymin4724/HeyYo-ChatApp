import InputBox from "../../components/sidebar/InputBox.jsx";
import { Send } from "lucide-react";

const colorClasses = {
  primary: "primary",
  secondary: "secondary",
};

const MessageSend = ({ messageText, onMessageChange, onSend, color }) => {
  const inputClass = colorClasses[color] || colorClasses.primary;
  return (
    <div className="flex justify-between gap-2 p-4 border-t border-base-300">
      <div className="flex-grow">
        <InputBox
          type="text"
          placeholder="Type a message..."
          name="message"
          value={messageText}
          onChange={onMessageChange}
          inputColor={inputClass}
        />
      </div>
      <button
        onClick={onSend}
        className={`btn btn-circle btn-${inputClass} pr-[2px]`}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageSend;
