import { useState } from "react";
import styles from "./style/login.module.css";
import { loginUser } from "../services/login";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { inter } from "../assets/fonts/fonts";
import { interw } from "../assets/fonts/fonts";

export default function Login({ setToken }) {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const [errParamete, setParam] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  function validationCheck() {
    const userlen = data.username.length;
    const passlen = data.password.length;
    if (userlen == 0 || passlen == 0) {
      if (userlen == 0 && passlen == 0) setParam("All fields");
      else if (userlen == 0) setParam("Username");
      else setParam("Password");
      setError(true);
      return false;
    } else {
      setError(false);
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationCheck()) {
      const token = await loginUser({ data });
      setToken(token);
      if (token["token"] !== "no" && token["token"] !== "invalid") {
        router.replace("/profile");
      }
    }
  };

  return (
    <div className={styles.loginBox}>
      <div className={styles.loginText} style={inter.style}>
        <h2>Login to your account</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.username}>
          <p className={styles.userp}>Enter Username</p>
          <input
          autoFocus
            type="text"
            className={styles.Input}
            value={data.username}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div className={styles.password}>
          <p className={styles.userp}>Enter Password</p>
          <input
            type="password"
            className={styles.Input}
            value={data.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        {error ? (
          <p className={styles.warning}>{errParamete} cannot be empty</p>
        ) : (
          <p></p>
        )}
        <button type="submit" className={styles.button} style={interw.style}>
          Submit
        </button>
      </form>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
