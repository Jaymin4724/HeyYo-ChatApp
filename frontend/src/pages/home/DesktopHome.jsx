import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/sidebar/Navbar.jsx";
import ContactList from "../../components/sidebar/ContactList.jsx";
import MessageContainer from "../../components/chat/MessageContainer.jsx";

const DesktopHome = () => {
  // Navbar
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isCollapsed ? "8%" : "30%" }}
        transition={{ duration: 0.4 }}
        className="bg-base-200 h-full flex flex-col justify-between border-r border-base-300"
      >
        {/* Navbar */}
        <div className="sticky top-0 z-10 mb-3">
          <Navbar
            title="HeyYo"
            onButtonClick={toggleSidebar}
            collapsed={isCollapsed}
            action={isCollapsed ? "login" : "chat"}
            actionColor="primary"
            gradient="from-green-300 via-blue-500 to-purple-600"
          />
        </div>

        {/* ContactList */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto">
            <ContactList
              searchText={searchText}
              onSearchChange={handleSearchChange}
              inputColor="primary"
              contacts={contacts}
              onContactClick={handleContactClick}
              className="px-3 pb-4"
            />
          </div>
        )}
      </motion.div>

      {/* MessageContainer */}
      <motion.div
        animate={{ width: isCollapsed ? "100%" : "100%" }}
        transition={{ duration: 0.4 }}
        className="h-full bg-base-100 flex flex-col"
      >
        <MessageContainer
          selectedContact={selectedContact}
          messages={messages}
          messageText={messageText}
          onMessageChange={handleMessageChange}
          onSend={handleSendMessage}
          color="primary"
        />
      </motion.div>
    </div>
  );
};

export default DesktopHome;
