import Message from "./Message.jsx";

const Messages = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg, idx) => (
        <Message
          key={idx}
          text={msg.text}
          fromSelf={msg.sender === currentUser}
        />
      ))}
    </div>
  );
};

export default Messages;
