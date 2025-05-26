import React, { useState } from "react";
import ContactCard from "./ContactCard.jsx";
import InputBox from "./InputBox.jsx";

const ContactList = ({
  contacts,
  searchText,
  onSearchChange,
  onContactClick,
  inputColor,
  className = "",
}) => {
  const [Color, setColor] = useState(inputColor);

  return (
    <div className={`w-full ${className}`}>
      <ul className="menu bg-base-100 rounded-box w-full">
        <div className="m-2">
          <InputBox
            type="text"
            placeholder="Search..."
            name="search"
            value={searchText}
            onChange={onSearchChange}
            inputColor={Color}
          />
        </div>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onContactClick={(contact) => onContactClick(contact)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
