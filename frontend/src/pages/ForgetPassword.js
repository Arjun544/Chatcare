import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";
import Logo from "../components/Logo";
import { forgetPassword } from "../services/auth_services";

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
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-evenly">
      <div className="flex flex-col h-fit items-center gap-1 bg-white">
        <Logo />
        <h1 className="text-black font-semibold tracking-wider text-lg">
          ChatCare
        </h1>
      </div>
      <form
        action="submit"
        onSubmit={(e) => handleSendCode(e)}
        className="bg-white w-5/6 md:w-1/2 h-1/2 flex flex-col items-center justify-around border-0 rounded-2xl shadow-md"
      >
        <div className="flex flex-col items-center gap-4 px-5">
          <BsFillShieldLockFill fontSize={40} color={"#3fdd00"} />
          <h5 className="text-slate-400 tracking-wider text-sm">
            Enter your registered email, to get password recovery code.
          </h5>
        </div>
        <input
          value={email}
          type="email"
          required
          autoComplete="off"
          placeholder="Enter your email"
          className="bg-slate-200 w-5/6 h-16 rounded-xl pl-4 placeholder:tracking-wider placeholder:font-normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isLoading ? (
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        ) : (
          <button
            type="submit"
            className="bg-customOrange w-1/2 md:w-1/5 shadow-md h-14 rounded-xl text-white tracking-wider font-semibold hover:scale-95 transition-all duration-700 ease-in-out"
          >
            Send Code
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
