import React from "react";
import Conversation from "../Conversation/Conversation";
import { container } from "./Conversations.module.css";
import useGetConversations from "../../hooks/useGetConversations";
import { Oval } from "react-loader-spinner";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className={container}>
      {loading ? (
        <Oval
          height="3rem"
          width="3rem"
          color="white"
          secondaryColor="white"
          ariaLabel="oval-loading"
          strokeWidth="5"
          strokeWidthSecondary="5"
        />
      ) : (
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      )}
    </div>
  );
}

export default Conversations;
