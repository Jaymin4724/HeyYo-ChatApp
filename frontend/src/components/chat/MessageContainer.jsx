import { LucideMessagesSquare } from "lucide-react";
import Messages from "./Messages";
import MessageSend from "./MessageSend";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import useContacts from "../../zustand/useContacts";

const MessageContainer = ({
  messageText,
  setMessageText,
  handleMessageChange,
  color,
}) => {
  const [Color, UserColor] = useState(color);
  const { authUser } = useContext(AuthContext);
  const {
    selectedContact,
    // setSelectedContact,
  } = useContacts();

  // useEffect(() => {
  //    Cleanup Function
  //   return () => {
  //     setSelectedContact(null);
  //   };
  // }, []);

  if (!selectedContact) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center p-8 space-y-4">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            HeyYo
          </span>
        </h1>
        <p className="text-lg text-base-content/70">
          Hello <b>{`${authUser.firstname} ${authUser.lastname}`}</b>
          , <br />
          Select a chat from the left to start messaging.
        </p>
        <div>
          <LucideMessagesSquare size={40} className="text-base-content/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-base-300">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={selectedContact.profilePic}
                alt={`${selectedContact.firstname} ${selectedContact.lastname}`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base">
              {selectedContact.firstname} {selectedContact.lastname}
            </span>
            <span className="text-sm text-gray-500">
              @{selectedContact.username}
            </span>
          </div>
        </div>
      </div>

      <Messages currentUser={authUser._id} />

      <MessageSend
        messageText={messageText}
        setMessageText={setMessageText}
        handleMessageChange={handleMessageChange}
        color={Color}
      />
    </div>
  );
};

export default MessageContainer;
