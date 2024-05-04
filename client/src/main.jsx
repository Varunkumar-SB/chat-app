import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ConversationProvider } from "./context/Conversation.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ConversationProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ConversationProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
