import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const origin = process.env.ORIGIN;
  useEffect(() => {
    if (authUser) {
      const socket = io(`${origin}`, {
        query: {
          userId: authUser._id,
        },
        extraHeaders: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, setSocket, setOnlineUsers]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
