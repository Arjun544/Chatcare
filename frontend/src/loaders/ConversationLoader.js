import React from "react";

const ConversationLoader = () => {
  return (
    <div className="flex flex-col gap-4 h-fit w-full bg-white">
      <div className="flex w-full h-20 items-center justify-between px-4 bg-gray-200 rounded-2xl ">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="flex h-10 w-10 rounded-full bg-slate-300 animate-pulse"></div>
          <div className="flex flex-col gap-3">
            <div className="h-3 w-16 rounded-xl bg-slate-300 animate-pulse"></div>
            <div className="h-3 w-28 rounded-xl bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="h-4 w-10 rounded-xl bg-slate-300 animate-pulse"></div>
      </div>
      <div className="flex w-full h-20 items-center justify-between px-4 bg-gray-200 rounded-2xl ">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="flex h-10 w-10 rounded-full bg-slate-300 animate-pulse"></div>
          <div className="flex flex-col gap-3">
            <div className="h-3 w-16 rounded-xl bg-slate-300 animate-pulse"></div>
            <div className="h-3 w-28 rounded-xl bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="h-4 w-10 rounded-xl bg-slate-300 animate-pulse"></div>
      </div>
      <div className="flex w-full h-20 items-center justify-between px-4 bg-gray-200 rounded-2xl ">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="flex h-10 w-10 rounded-full bg-slate-300 animate-pulse"></div>
          <div className="flex flex-col gap-3">
            <div className="h-3 w-16 rounded-xl bg-slate-300 animate-pulse"></div>
            <div className="h-3 w-28 rounded-xl bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="h-4 w-10 rounded-xl bg-slate-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ConversationLoader;
