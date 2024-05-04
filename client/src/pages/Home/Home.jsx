import { main, container, sidebar, messages } from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Messages from "../../components/Messages/Messages";

function Home() {
  return (
    <div className={main}>
      <div className={container}>
        <div className={sidebar}>
          <Sidebar />
        </div>
        <div className={messages}>
          <Messages />
        </div>
      </div>
    </div>
  );
}

export default Home;
