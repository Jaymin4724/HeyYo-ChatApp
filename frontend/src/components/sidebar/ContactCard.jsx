import React from "react";

const ContactCard = ({ contact, onContactClick }) => {
  return (
    <li className="my-2 cursor-pointer" onClick={() => onContactClick(contact)}>
      <div className="flex items-center gap-4">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full overflow-hidden">
            <img
              src={contact.profilePic}
              alt={`${contact.firstname} ${contact.lastname}`}
            />
          </div>
        </div>
        <p className="text-[20px] font-extralight">
          {contact.firstname} {contact.lastname}
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
