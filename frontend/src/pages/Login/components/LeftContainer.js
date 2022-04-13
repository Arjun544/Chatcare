import React from "react";
import Logo from "../../../components/Logo";
import loginCover from "../../../assets/login-cover.png";

const LeftContainer = () => {
  return (
    <div className="flex-col w-1/3 items-center justify-around bg-slate-200 hidden md:flex">
      <div className="flex items-center gap-4">
        <Logo />
        <h1 className="text-black font-semibold tracking-wider text-lg">
          ChatCare
        </h1>
      </div>
      <img src={loginCover} alt="login-cover" className="w-1/2" />
      <h1 className="font-semibold tracking-wider text-xl text-center">
        Just remember the time we spent together
      </h1>
    </div>
  );
};

export default LeftContainer;
