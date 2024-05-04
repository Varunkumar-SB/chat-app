import React from "react";
import { container } from "./Logout.module.css";
import { TbLogout2 } from "react-icons/tb";
import { IconContext } from "react-icons";
import Button from "../Button/Button";
import useLogout from "../../hooks/useLogout";
import { Oval } from "react-loader-spinner";

function Logout() {
  const { loading, logout } = useLogout();
  return (
    <IconContext.Provider value={{ size: "3rem" }}>
      <div className={container}>
        <Button onClick={logout} disabled={loading}>
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
            <>
              <TbLogout2 />
              <p>Logout</p>
            </>
          )}
        </Button>
      </div>
    </IconContext.Provider>
  );
}

export default Logout;
