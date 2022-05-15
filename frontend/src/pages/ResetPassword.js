import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import ReactPinField from "react-pin-field";
import { useLocation, useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import Logo from "../components/Logo";
import Checkbox from "@nextui-org/react/checkbox";
import { forgetPassword, resetPassword } from "../services/auth_services";

import styles from "./PinField.module.css";

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
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-evenly">
      <div className="flex flex-col h-fit items-center gap-1 bg-white">
        <Logo />
        <h1 className="text-black font-semibold tracking-wider text-lg">
          ChatCare
        </h1>
      </div>
      <form
        action="submit"
        onSubmit={(e) => handleResetPassword(e)}
        className="bg-white w-5/6 md:w-1/2 h-2/3 flex flex-col py-4 items-center justify-around border-0 rounded-2xl shadow-md"
      >
        <div className="flex flex-col items-center gap-4 px-5">
          <HiMail fontSize={40} color={"#3fdd00"} />
          <h5 className="text-slate-400 tracking-wider text-sm">
            To reset password, Enter the code, we sent you on {email}
          </h5>
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
        <div className="flex flex-col w-5/6 md:w-1/2 gap-4">
          <input
            value={password}
            type={showPass ? "text" : "password"}
            autoComplete="off"
            required
            minLength={8}
            placeholder="Enter new password"
            className="bg-slate-200 w-full h-16 rounded-xl pl-4 placeholder:tracking-wider placeholder:font-normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={confirmPassword}
            type={showPass ? "text" : "password"}
            autoComplete="off"
            required
            minLength={8}
            placeholder="Enter new confirm password"
            className="bg-slate-200 w-full h-16 rounded-xl pl-4 placeholder:tracking-wider placeholder:font-normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              value={showPass}
              checked={showPass}
              type="checkbox"
              onChange={(e) => setShowPass(!showPass)}
            />
            <h4 className="text-slate-400 tracking-wider text-xs font-medium">
              Show Password
            </h4>
          </div>
        </div>
        {isLoading ? (
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        ) : (
          <div className="flex flex-col gap-2 w-full items-center">
            <span
              className="text-green-500 font-semibold text-sm tracking-wider cursor-pointer hover:text-green-500"
              onClick={(e) => handleResendCode(e)}
            >
              Resend Code
            </span>
            <button
              type="submit"
              className="bg-customOrange w-1/2 md:w-1/5 shadow-md h-14 rounded-xl text-white tracking-wider font-semibold hover:scale-95 transition-all duration-700 ease-in-out"
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
    // <div className={styles.mainWrapper}>
    //   <div className={styles.logoWrapper}>
    //     <Logo />
    //     <h3
    //       style={{
    //         letterSpacing: "0.5px",
    //       }}
    //     >
    //       ChatCare
    //     </h3>
    //   </div>

    //   <form
    //     action="submit"
    //     className={styles.verificationWrapper}
    //     onSubmit={(e) => handleResetPassword(e)}
    //   >
    //     <div className={styles.emailWrapper}>
    //       <HiMail fontSize={40} color={"#3fdd00"} />
    //       <h5>To reset password, Enter the code, we sent you on {email}</h5>
    //     </div>
    //     <ReactPinField
    //       id="pinField"
    //       className={styles.pinField}
    //       length={6}
    //       autocapitalize="off"
    //       autocorrect="off"
    //       autocomplete="off"
    //       inputmode="number"
    //       validate="0123456789"
    //       onComplete={(detail) => setCode(detail)}
    //     />
    //     <div className={styles.passwordWrapper}>
    //       <input
    //         value={password}
    //         type={showPass ? "text" : "password"}
    //         autoComplete="off"
    //         required
    //         minLength={8}
    //         placeholder="Enter new password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <input
    //         value={confirmPassword}
    //         type={showPass ? "text" : "password"}
    //         autoComplete="off"
    //         required
    //         minLength={8}
    //         placeholder="Enter new confirm password"
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />

    //       <div className={styles.showPassWrapper}>
    //         <Checkbox
    //           value={showPass}
    //           checked={showPass}
    //           type="checkbox"
    //           onChange={(e) => setShowPass(!showPass)}
    //         />
    //         <h4>Show Password</h4>
    //       </div>
    //     </div>

    //     {isLoading ? (
    //       <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
    //     ) : (
    //       <div className={styles.buttonsWrapper}>
    //         <span onClick={(e) => handleResendCode(e)}>Resend Code</span>
    //         <button
    //           type="submit"
    //           disabled={code < 6 ? true : false}
    //           className={styles.verifyBtn}
    //         >
    //           Reset
    //         </button>
    //       </div>
    //     )}
    //   </form>
    // </div>
  );
};

export default ResetPassword;
