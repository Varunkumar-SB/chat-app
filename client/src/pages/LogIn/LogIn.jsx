import { Link } from "react-router-dom";
import { container, title, form, label, input, a } from "./LogIn.module.css";
import Button from "../../components/Button";

function LogIn() {
  return (
    <>
      <div className={container}>
        <form action="" className={form}>
          <h1 className={title}>LogIn</h1>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" type="email" className={input} />
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input id="password" type="password" className={input} />
          <Link to="/SignUp" className={a}>
            Don&apos;t have an account?
          </Link>
          <Button>LogIn</Button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
