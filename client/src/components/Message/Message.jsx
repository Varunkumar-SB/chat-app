import React from "react";
import { sender, receiver, messagecss, time } from "./Message.module.css";
import { useAuthContext } from "../../context/AuthContext";
import convertTime from "../../utils/convertTime";

function Message({ message }) {
  const { authUser } = useAuthContext();
  let context;
  if (authUser._id === message.senderId) {
    context = "sender";
  } else {
    context = "receiver";
  }
  return (
    <div
      className={`${context === "receiver" ? receiver : sender} ${messagecss}`}
    >
      {message.message}
      <div className={time}>{convertTime(message.createdAt)}</div>
    </div>
  );
}

export default Message;
