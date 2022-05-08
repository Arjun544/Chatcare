import React from "react";

const MessagesLoader = () => {
  return (
    <div className="flex flex-col h-full w-full  bg-slate-200  justify-end">
      <div className="flex flex-col gap-3 py-4 items-end">
        <div className="flex h-10 w-52 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
        <div className="flex h-10 w-32 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
        <div className="flex h-10 w-16 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-3 py-4">
        <div className="flex h-10 w-20 bg-slate-300 px-4 rounded-t-xl rounded-bl-xl ml-8 animate-pulse"></div>
        <div className="flex h-10 w-32 bg-slate-300 px-4 rounded-t-xl rounded-bl-xl ml-8 animate-pulse"></div>
        <div className="flex h-10 w-16 bg-slate-300 px-4 rounded-t-xl rounded-bl-xl ml-8 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-3 py-4 items-end">
        <div className="flex h-10 w-20 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
        <div className="flex h-10 w-32 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
        <div className="flex h-10 w-16 bg-blue-300 px-4 rounded-t-xl rounded-bl-xl mr-8 animate-pulse"></div>
      </div>
    </div>
  );
};

export default MessagesLoader;
