import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useContacts from "../zustand/useContacts";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedContact, setMessages } = useContacts();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/messages/${selectedContact._id}`);
        setMessages(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedContact?._id) getMessages();
  }, [selectedContact._id, setMessages]);
  return { loading };
};

export default useGetMessages;
