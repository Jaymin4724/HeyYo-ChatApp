const Message = ({ text, fromSelf }) => {
  return (
    <div className={`chat ${fromSelf ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble ${
          fromSelf ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
