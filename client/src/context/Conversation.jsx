import { createContext, useState, useContext } from "react";

export const Conversation = createContext();

export const useConversation = () => {
  return useContext(Conversation);
};

export const ConversationProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  return (
    <Conversation.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </Conversation.Provider>
  );
};
