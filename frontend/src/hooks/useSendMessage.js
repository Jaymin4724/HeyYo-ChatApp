import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useContacts from "../zustand/useContacts";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedContact, messages, setMessages } = useContacts();
  const sendMessage = async (message) => {
    if (!message.trim()) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/messages/send/${selectedContact._id}`,
        { message }
      );
      // console.log(res.data.newMessage.message);
      setMessages([...messages, res.data.newMessage]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
