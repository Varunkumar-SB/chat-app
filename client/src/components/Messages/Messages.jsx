import React, { useEffect, useRef, useState } from "react";
import {
  container,
  top,
  messagescss,
  loadingcss,
  bottom,
  container1,
  box,
  backarrow,
  button,
} from "./Messages.module.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";
import { IconContext } from "react-icons";
import Message from "../Message/Message";
import { useConversation } from "../../context/Conversation";
import useSendMessage from "../../hooks/useSendMessage";
import { Oval } from "react-loader-spinner";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";

function Messages() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const { messages, loading: messagesLoading } = useGetMessages();
  const { loading, sendMessage } = useSendMessage();
  const messageContainerRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [selectedConversation, messageContainerRef, messages]);
  return (
    <IconContext.Provider value={{ size: "2rem", color: "white" }}>
      <div className={container}>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className={top}>
              <IoIosArrowBack
                className={backarrow}
                onClick={() => {
                  setSelectedConversation(null);
                }}
              />
              <img src={selectedConversation.profilePic} alt="pfp" />
              <p>{selectedConversation.username}</p>
            </div>
            <div className={messagescss}>
              {messagesLoading && (
                <div className={loadingcss}>
                  <Oval
                    height="8rem"
                    width="8rem"
                    color="white"
                    secondaryColor="white"
                    ariaLabel="oval-loading"
                    strokeWidth="5"
                    strokeWidthSecondary="5"
                  />
                </div>
              )}
              {!messagesLoading && messages.length === 0 && (
                <p className={loadingcss}>
                  Send a message to start the conversation
                </p>
              )}
              {!messagesLoading &&
                messages.length > 0 &&
                messages.map((message) => (
                  <Message key={message._id} message={message} />
                ))}
              <div ref={messageContainerRef} />
            </div>
            <form onSubmit={handleSubmit} className={bottom}>
              <input
                type="text"
                placeholder="Type here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button className={button}>
                {loading ? (
                  <Oval
                    height="3rem"
                    width="3rem"
                    color="black"
                    secondaryColor="black"
                    ariaLabel="oval-loading"
                    strokeWidth="5"
                    strokeWidthSecondary="5"
                  />
                ) : (
                  <IoIosArrowForward />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </IconContext.Provider>
  );
}

export default Messages;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <IconContext.Provider value={{ size: "10rem", color: "white" }}>
      <div className={container1}>
        <div className={box}>
          <p>Welcome {authUser.username}!</p>
          <p>Select a Chat to start Messaging</p>
          <IoMdChatbubbles />
        </div>
      </div>
    </IconContext.Provider>
  );
};
