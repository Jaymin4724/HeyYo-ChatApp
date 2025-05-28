import { useState } from "react";

import Navbar from "../../components/sidebar/Navbar.jsx";
import ContactList from "../../components/sidebar/ContactList.jsx";
import MessageContainer from "../../components/chat/MessageContainer.jsx";

const MobileHome = () => {
  // Navbar
  const [showContacts, setShowContacts] = useState(true);
  const toggleView = () => {
    setShowContacts(!showContacts);
    if (showContacts) setSelectedContact(null);
  };

  // ContactList
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const contacts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    firstname: `User`,
    lastname: `${i}`,
    username: `user00${i}`,
    profilePic: `https://i.pravatar.cc/40?img=${i + 1}`,
    gender: "male",
  }));
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactClick = (contact) => {
    console.log("Selected contact:", contact);
    setSelectedContact(contact);
    setShowContacts(false);
  };

  // MessageContainer
  const [messageText, setMessageText] = useState("");
  const handleMessageChange = (e) => setMessageText(e.target.value);
  const [messages, setMessages] = useState([
    { text: "Hi there!", sender: "other" },
    { text: "Hello! How can I help?", sender: "me" },
  ]);
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessages((prev) => [...prev, { text: messageText, sender: "me" }]);
    setMessageText("");
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-base-100">
      {/* Navbar */}

      <div className="sticky top-0 z-10">
        <Navbar
          title="HeyYo"
          onButtonClick={toggleView}
          action={showContacts ? "chat" : "logout"}
          actionColor="secondary"
          gradient="from-pink-500 via-red-500 to-yellow-500"
        />
      </div>

      {/* Contacts List */}
      {showContacts ? (
        <div className="flex-1 overflow-y-auto">
          <ContactList
            searchText={searchText}
            onSearchChange={handleSearchChange}
            inputColor="secondary"
            contacts={contacts}
            onContactClick={handleContactClick}
          />
        </div>
      ) : (
        <MessageContainer
          selectedContact={selectedContact}
          messages={messages}
          messageText={messageText}
          onMessageChange={handleMessageChange}
          onSend={handleSendMessage}
          color="secondary"
        />
      )}
    </div>
  );
};

export default MobileHome;
