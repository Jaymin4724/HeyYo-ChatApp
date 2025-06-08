import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import {SocketContext} from "../../context/SocketContext.jsx";
import useContacts from "../../zustand/useContacts.js";
const ContactCard = ({ contact, inputColor }) => {
  const { authUser } = useContext(AuthContext);
  const { onlineUsers } = useContext(SocketContext);
  const { selectedContact, setSelectedContact } = useContacts();
  const [isOnline, setIsOnline] = useState(false);

  // Set isOnline true if contact._id is in onlineUsers
  useEffect(() => {
    setIsOnline(onlineUsers.includes(contact._id));
  }, [onlineUsers, contact._id]);

  const colorClassMap = {
    primary: "bg-primary",
    secondary: "bg-secondary",
  };
  const isSelected = selectedContact?._id === contact._id;
  return (
    <li
      className={`my-2 cursor-pointer ${
        isSelected ? `${colorClassMap[inputColor]}  rounded-lg mx-1` : ""
      }`}
      onClick={() => setSelectedContact(contact)}
    >
      <div className="flex items-center gap-4">
        <div
          className={`bg-white rounded-3xl p-[2.5px] avatar ${
            isOnline ? "avatar-online" : "avatar-offline"
          }`}
        >
          <div className="w-12 rounded-full overflow-hidden">
            <img
              src={contact.profilePic}
              alt={`${contact.firstname} ${contact.lastname}`}
            />
          </div>
        </div>
        <p className="text-[20px] font-extralight">
          {authUser.username === contact.username
            ? "You"
            : `${contact.firstname} ${contact.lastname}`}
          <span className="font-semibold text-white">
            {" "}
            {`(${contact.username})`}
          </span>
        </p>
      </div>
    </li>
  );
};

export default ContactCard;
