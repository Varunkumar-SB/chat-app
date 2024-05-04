import { Link } from "react-router-dom";
import { container, title, form, label, input, a } from "./LogIn.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Oval } from "react-loader-spinner";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <>
      <div className={container}>
        <form onSubmit={handleSubmit} className={form}>
          <h1 className={title}>LogIn</h1>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            className={input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link to="/SignUp" className={a}>
            Don&apos;t have an account?
          </Link>
          <Button disabled={loading}>
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
              <span>LogIn</span>
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
