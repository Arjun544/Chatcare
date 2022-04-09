import React from "react";
import Logo from "../../../components/Logo";
import loginCover from "../../../assets/login-cover.png";
import styles from "../Register.module.css";

const LeftContainer = () => {
  return (
    <div className={styles.leftContainer}>
      <div className={styles.logoWrapper}>
        <Logo />
        <h1>ChatCare</h1>
      </div>
      <img src={loginCover} alt="login-cover" />
      <h1>Just remember the time we spent together</h1>
    </div>
  );
};

export default LeftContainer;
