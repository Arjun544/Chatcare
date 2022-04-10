import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import Logo from "../components/Logo";
import { forgetPassword } from "../services/auth_services";

import styles from "./Verification/Verification.module.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await forgetPassword(email);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success("Code sent successfully");
        navigate("/resetPassword", { state: { email: email } });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
        <h3 style={{
          letterSpacing: "0.5px",
        }}>ChatCare</h3>
      </div>
      <form
        action="submit"
        className={styles.verificationWrapper}
        onSubmit={(e) => handleSendCode(e)}
      >
        <div className={styles.emailWrapper}>
          <BsFillShieldLockFill fontSize={40} color={"#3fdd00"} />
          <h5>Enter your registered email, to get password recovery code.</h5>
        </div>
        <div className={styles.passwordWrapper}>
          <input
            value={email}
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {isLoading ? (
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        ) : (
          <button type="submit" className={styles.verifyBtn}>
            Send Code
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
