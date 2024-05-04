import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../context/Conversation";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://able-badly-chipmunk.ngrok-free.app/api/v1/message/${selectedConversation._id}`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { loading, messages };
};

export default useGetMessages;
