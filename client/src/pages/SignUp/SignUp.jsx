import { Link } from "react-router-dom";
import { container, title, form, label, input, a } from "./SignUp.module.css";
import Button from "../../components/Button";

function SignUp() {
  return (
    <>
      <div className={container}>
        <form action="" className={form}>
          <h1 className={title}>SignUp</h1>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" type="email" className={input} />
          <label htmlFor="username" className={label}>
            Username
          </label>
          <input id="username" type="text" className={input} />
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input id="password" type="password" className={input} />
          <label htmlFor="password" className={label}>
            Confirm Password
          </label>
          <input id="password" type="password" className={input} />
          <Link to="/LogIn" className={a}>
            Already have an account?
          </Link>
          <Button>SignUp</Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
