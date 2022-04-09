import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import ReactPinField from "react-pin-field";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import { setAuth } from "../../redux/reducers/authSlice";
import { activate, resendCode } from "../../services/auth_services";

import styles from "./Verification.module.css";

const Verification = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !isAuth && !user && navigate("/login");
  }, [navigate, isAuth]);

  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await resendCode(user.email);
      console.log(data);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        dispatch(setAuth({ isAuth: true, user: data.user }));
        toast.success("Code sent successful");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await activate(user.email, code);
      console.log(data);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        dispatch(setAuth({ isAuth: true, user: data.user }));
        toast.success("Verification Successful");
        navigate("/", { replace: true });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.verificationWrapper}>
        <div className={styles.emailWrapper}>
          <GoVerified fontSize={40} color={"#3fdd00"} />
          <h4>We sent you code on {user?.email}</h4>
        </div>
        <ReactPinField
          className={styles.pinField}
          length={6}
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
          inputmode="number"
          validate="0123456789"
          onComplete={(detail) => setCode(detail)}
        />
        {isLoading ? (
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        ) : (
          <div className={styles.buttonsWrapper}>
            <span onClick={(e) => handleResendCode(e)}>Resend Code</span>
            <button
              disabled={code < 6 ? true : false}
              onClick={(e) => handleVerifyCode(e)}
              className={styles.verifyBtn}
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;
