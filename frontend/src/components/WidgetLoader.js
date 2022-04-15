import React from "react";
import Logo from "./Logo";

const WidgetLoader = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-white items-center justify-center gap-4">
      <div className="animate-spin">
        <Logo />
      </div>
      <h1 className="text-lg font-semibold tracking-widest text-black">
        LOADING
      </h1>
    </div>
  );
};

export default WidgetLoader;
