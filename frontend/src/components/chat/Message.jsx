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

  const selfChat =
    msg.senderId === authUser.id && msg.senderId === msg.recieverId;
  const isFromSelf =
    msg.senderId === authUser.id && msg.recieverId === selectedContact._id;

  return (
    <div
      className={`chat ${selfChat || isFromSelf ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-header text-left mb-1">
        {selfChat || isFromSelf
          ? "You"
          : `${selectedContact.firstname} ${selectedContact.lastname}`}
      </div>
      <div className="chat-bubble">{msg.message}</div>
      <time className="chat-footer text-[10px] text-left opacity-50 mt-1">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </time>
    </div>
  );
};

export default Message;
