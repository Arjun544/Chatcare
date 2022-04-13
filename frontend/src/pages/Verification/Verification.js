import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import ReactPinField from "react-pin-field";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import Logo from "../../components/Logo";
import { setAuth } from "../../redux/reducers/authSlice";
import { activate, resendCode } from "../../services/auth_services";

import styles from "../PinField.module.css";

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
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-evenly">
      <div className="flex flex-col h-fit items-center gap-1 bg-white">
        <Logo />
        <h1 className="text-black font-semibold tracking-wider text-lg">
          ChatCare
        </h1>
      </div>
      {user.active === true ? (
        <div className="bg-white w-5/6 md:w-1/2 h-1/2 flex flex-col items-center justify-around border-0 rounded-2xl shadow-md">
          <div className="flex flex-col items-center gap-4 px-5">
            <HiMail fontSize={40} color={"#3fdd00"} />
            <h5 className="text-slate-400 tracking-wider text-sm">
              Your account is verified using {user?.email}
            </h5>
          </div>
        </div>
      ) : (
        <div className="bg-white w-5/6 md:w-1/2 h-1/2 flex flex-col items-center justify-around border-0 rounded-2xl shadow-md">
          <div className="flex flex-col items-center gap-4 px-5">
            <HiMail fontSize={40} color={"#3fdd00"} />
            <h5 className="text-slate-400 tracking-wider text-sm">
              We sent you code on {user?.email}
            </h5>
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
            <div className="flex flex-col gap-2 w-full items-center">
              <span
                className="text-green-400 text-sm tracking-wider font-semibold cursor-pointer hover:text-green-500"
                onClick={(e) => handleResendCode(e)}
              >
                Resend Code
              </span>
              <button
                disabled={code < 6 ? true : false}
                onClick={(e) => handleVerifyCode(e)}
                className="bg-customOrange w-1/2 md:w-1/5 shadow-md h-14 rounded-xl cursor-pointer text-white tracking-wider font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed hover:scale-95 transition-all duration-700 ease-in-out"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Verification;
