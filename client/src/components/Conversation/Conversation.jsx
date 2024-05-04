import React from "react";
import { container, icon, img, selected } from "./Conversation.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";
import { useConversation } from "../../context/Conversation";

function Conversation({ conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <IconContext.Provider value={{ size: "3rem" }}>
      <div
        className={`${container} ${isSelected ? selected : ""}`}
        onClick={() => {
          setSelectedConversation(conversation);
        }}
      >
        <div className={img}>
          <img src={conversation.profilePic} alt="pfp" />
        </div>
        <p>{conversation.username}</p>
        <IoIosArrowForward className={icon} />
      </div>
    </IconContext.Provider>
  );
}

export default Conversation;
