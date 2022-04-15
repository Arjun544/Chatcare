import React from "react";

const tabs = ["Media", "Files", "Star"];

const ConversationAttachments = () => {
  return (
    <div className="w-2/12 bg-white flex flex-col items-center my-8 gap-5 px-4">
      <h1 className="text-black font-semibold tracking-wider">Attachments</h1>
      <div className="flex items-center justify-around w-full h-14 bg-slate-100 rounded-2xl">
        {tabs.map((tab, index) => (
          <h1
            key={index}
            className="text-black tracking-wider font-normal text-sm cursor-pointer px-5 py-2 rounded-xl hover:bg-slate-400 hover:text-white transition-all duration-500 ease-in-out"
          >
            {tab}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default ConversationAttachments;
