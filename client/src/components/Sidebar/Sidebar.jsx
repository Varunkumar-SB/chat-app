import React from "react";
import { container } from "./Sidebar.module.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import Conversations from "../Conversations/Conversations";
import Logout from "../../components/Logout/Logout";

function Sidebar() {
  return (
    <div className={container}>
      <Searchbar />
      <Conversations />
      <Logout />
    </div>
  );
}

export default Sidebar;
