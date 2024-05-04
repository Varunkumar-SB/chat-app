import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ email, username, password, confirmPassword }) => {
    const success = handleInputErrors({
      email,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://able-badly-chipmunk.ngrok-free.app/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ email, username, password, confirmPassword }),
        }
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      localStorage.setItem("user-info", JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;

const handleInputErrors = ({ email, username, password, confirmPassword }) => {
  if (!email || !username || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
};
