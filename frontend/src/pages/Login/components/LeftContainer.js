import React from "react";
import loginCover from "../../../assets/login-cover.png";


const LeftContainer = () => {
  return (
    <div className="flex-col w-1/2 items-center justify-around bg-slate-200 hidden md:flex">
      <div className="flex">
        <h1 className="font-semibold tracking-wider text-xl text-center">
          Just remember the time we spent 
        </h1>
        <h1 className="font-semibold tracking-wider text-xl text-center">
          Just remember the time we spent together
        </h1>
      </div>
      <img src={loginCover} alt="login-cover" className="w-1/2" />
    </div>
  );
};

export default LeftContainer;
