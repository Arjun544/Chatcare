import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import ReactPinField from "react-pin-field";
import { useLocation, useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import Logo from "../components/Logo";
import Checkbox from "@nextui-org/react/checkbox";
import { forgetPassword, resetPassword } from "../services/auth_services";

import styles from "./Verification/Verification.module.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await forgetPassword(email);
      console.log(data);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success("Code sent successful");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await resetPassword(
        email,
        code,
        password,
        confirmPassword
      );
      console.log(data);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success("Password reset Successful, login now");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
        <h3
          style={{
            letterSpacing: "0.5px",
          }}
        >
          ChatCare
        </h3>
      </div>

      <form
        action="submit"
        className={styles.verificationWrapper}
        onSubmit={(e) => handleResetPassword(e)}
      >
        <div className={styles.emailWrapper}>
          <HiMail fontSize={40} color={"#3fdd00"} />
          <h5>To reset password, Enter the code, we sent you on {email}</h5>
        </div>
        <ReactPinField
          id="pinField"
          className={styles.pinField}
          length={6}
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
          inputmode="number"
          validate="0123456789"
          onComplete={(detail) => setCode(detail)}
        />
        <div className={styles.passwordWrapper}>
          <input
            value={password}
            type={showPass ? "text" : "password"}
            autoComplete="off"
            required
            minLength={8}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={confirmPassword}
            type={showPass ? "text" : "password"}
            autoComplete="off"
            required
            minLength={8}
            placeholder="Enter new confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className={styles.showPassWrapper}>
            <Checkbox
              value={showPass}
              checked={showPass}
              type="checkbox"
              onChange={(e) => setShowPass(!showPass)}
            />
            <h4>Show Password</h4>
          </div>
        </div>

        {isLoading ? (
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        ) : (
          <div className={styles.buttonsWrapper}>
            <span onClick={(e) => handleResendCode(e)}>Resend Code</span>
            <button
              type="submit"
              disabled={code < 6 ? true : false}
              className={styles.verifyBtn}
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
