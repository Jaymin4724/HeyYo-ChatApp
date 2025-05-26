const Message = ({ text, fromSelf }) => {
  return (
    <div className={`chat ${fromSelf ? "chat-end" : "chat-start"} px-2`}>
      <div
        className={`chat-bubble ${
          fromSelf ? "bg-black text-white" : "bg-amber-50 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
