import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useContacts from "../../zustand/useContacts";

const Message = ({ msg, isEmpty = false }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedContact } = useContacts();

  if (isEmpty) {
    return (
      <div className="self-start text-center text-gray-400 mt-2">
        No messages yet. Start the conversation!
      </div>
    );
  }

  const isSelfChat = selectedContact._id === authUser.id;
  const isSentByMe = msg.senderId === authUser.id;

  // Alignment
  const alignment = isSelfChat
    ? "chat-end"
    : isSentByMe
    ? "chat-end"
    : "chat-start";

  // Bubble color
  const bubbleColor = isSelfChat
    ? "bg-purple-500 text-white" // same for all self-chat messages
    : isSentByMe
    ? "bg-blue-500 text-white"
    : "bg-gray-300 text-black";

  // Label
  const senderLabel = "You"; // always "You" for self-chat or sent-by-me

  const finalLabel =
    isSelfChat || isSentByMe
      ? "You"
      : `${selectedContact.firstname} ${selectedContact.lastname}`;

  return (
    <div className={`chat ${alignment}`}>
      <div className="chat-header text-left mb-1">{finalLabel}</div>
      <div className={`chat-bubble ${bubbleColor}`}>{msg.message}</div>
      <time className="chat-footer text-[10px] text-left opacity-50 mt-1">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </time>
    </div>
  );
};

export default Message;
