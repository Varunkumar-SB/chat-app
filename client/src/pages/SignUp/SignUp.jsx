import { useState } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { container, title, form, label, input, a } from "./SignUp.module.css";
import Button from "../../components/Button/Button";
import useSignUp from "../../hooks/useSignUp";

function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <>
      <div className={container}>
        <form onSubmit={handleSubmit} className={form}>
          <h1 className={title}>SignUp</h1>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={input}
            autoComplete="off"
            value={inputs.email}
            onChange={(e) => {
              setInputs({ ...inputs, email: e.target.value });
            }}
          />
          <label htmlFor="username" className={label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            className={input}
            autoComplete="off"
            value={inputs.username}
            onChange={(e) => {
              setInputs({ ...inputs, username: e.target.value });
            }}
          />
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={input}
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
          />
          <label htmlFor="confirmPassword" className={label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={input}
            value={inputs.confirmPassword}
            onChange={(e) => {
              setInputs({ ...inputs, confirmPassword: e.target.value });
            }}
          />
          <Link to="/LogIn" className={a}>
            Already have an account?
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
              <span>SignUp</span>
            )}
          </Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
