import React, { useState } from "react";
import { container, icon } from "./Searchbar.module.css";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";
import { useConversation } from "../../context/Conversation";
import useGetConversation from "../../hooks/useGetConversations";

function Searchbar() {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return toast.error("Field is empty");
    const conversation = conversations.find((c) =>
      c.username.includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
    } else {
      toast.error("No such user found");
    }
  };
  return (
    <IconContext.Provider value={{ size: "2rem", color: "white" }}>
      <form onSubmit={handleSubmit} className={container}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className={icon}>
          <FaSearch />
        </button>
      </form>
    </IconContext.Provider>
  );
}

export default Searchbar;
