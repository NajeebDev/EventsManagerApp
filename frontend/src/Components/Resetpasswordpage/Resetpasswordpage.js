import React, { useState, useEffect, useContext } from "react";
import styles from "./Resetpasswordpage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ModalBoxContext } from "../ModalBox/ModalBox";

function Resetpasswordpage() {
  const { token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [user, setUser] = useState({ password: "", password2: "", token: "" });
  const { addModalBox } = useContext(ModalBoxContext);

  const sendResetToken = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/user/newPassword/${token}`
      );
      console.log(response.data);
      setValidToken(true);
      setUser({ ...user, token });
    } catch (error) {
      console.log(error.response.data);
      setValidToken(false);
    }
  };

  useEffect(() => {
    if (token) sendResetToken();
  }, []);

  const [password, setPassword] = useState("");
  const changePw = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendResetPw = async (e) => {
    e.preventDefault();
    const { password, password2 } = user;
    if (password === "" || password2 === "") {
      console.log("please enter all the fields", " alert-infos");
    } else if (password !== password2) {
      console.log("password do not match", " alert-infos");
    } else if (password.length < 7 || password2.length < 7) {
      console.log("password must be more than 7 Character", " alert-infos");
    } else {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios.post(
          "http://localhost:7000/user/newPassword",
          user,
          config
        );
        console.log(response.data.msg);
        window.location = "/login";
      } catch (error) {
        console.log(error.response.data.msg);   
      }
    }
  };

  return (
    <div className={styles.containerresetpw}>
      <h1>Resetpassword</h1>
      {validToken ? (
        <form onSubmit={sendResetPw} className={styles.formpasswordheader}>
          <div className={styles.formpassword}>
            <label htmlFor="password">
              <i class="icon-shield"></i>
            </label>
            <input
              className={styles.forminput}
              type="password"
              onChange={changePw}
              name="password"
              placeholder=" Enter your new Password"
            />
          </div>

          <div className={styles.formpasswordnew}>
            <label htmlFor="password">
              <i class="icon-shield"></i>
            </label>
            <input
              type="password"
              onChange={changePw}
              name="password2"
              placeholder=" Confirm your new Password"
            />
          </div>
          <input
            type="submit"
            value="Resetpassword"
            className={styles.submitresetpw}
          />
        </form>
      ) : (
        <h1 className={styles.invalidpw}>
          <span>Your token is not valid </span>{" "}
        </h1>
      )}
    </div>
  );
}
export default Resetpasswordpage;
