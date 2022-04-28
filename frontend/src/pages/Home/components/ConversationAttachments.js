import React, { useState } from "react";
import { useSelector } from "react-redux";
import profileHolder from "../../../assets/profile_placeholder.png";
import {
  BsFileEarmarkBinaryFill,
  BsFileEarmarkImageFill,
} from "react-icons/bs";
import { RiLinksFill, RiArrowLeftSLine } from "react-icons/ri";

const tabs = ["Media", "Files", "Star"];

const ConversationAttachments = ({ conversation }) => {
  const { user } = useSelector((state) => state.auth);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  return conversation !== null && !isFilesOpen ? (
    // Media, Files & Links
    <div className="w-2/12 bg-white flex flex-col items-center my-8 gap-14 px-6 transition-all duration-500 ease-in-out">
      <h1 className="text-black font-semibold tracking-wider">Info</h1>
      <div className="flex flex-col items-center gap-2">
        <img
          src={
            conversation.members.find((member) => member.id !== user.id)
              .profile === ""
              ? profileHolder
              : conversation.members.find((member) => member.id !== user.id)
                  .profile
          }
          alt="user profile"
          className="h-20 w-20 object-contain rounded-full bg-white"
        />
        <h1 className="font-semibold text-black tracking-wider">
          {
            conversation.members.find((member) => member.id !== user.id)
              .username
          }
        </h1>
      </div>
      <div className="flex flex-col items-start w-full">
        <h1 className="text-black font-semibold tracking-wider mb-2 text-sm">
          Media, files & links
        </h1>
        {[
          { name: "Media", icon: <BsFileEarmarkImageFill size={20} /> },
          { name: "Files", icon: <BsFileEarmarkBinaryFill size={20} /> },
          { name: "Links", icon: <RiLinksFill size={20} /> },
        ].map((item, index) => (
          <div
            key={index}
            onClick={(e) => setIsFilesOpen(!isFilesOpen)}
            className="w-full flex items-center py-3 px-2 rounded-lg gap-2 cursor-pointer hover:bg-sky-100"
          >
            {item.icon}
            <h1 className="text-black tracking-wider text-sm font-semibold">
              {item.name}
            </h1>
          </div>
        ))}

        <h1 className="text-red-400 tracking-wider font-semibold text-sm my-3 cursor-pointer hover:text-red-600">
          Clear chat
        </h1>
        <h1 className="text-red-400 tracking-wider font-semibold text-sm my-3 cursor-pointer hover:text-red-600">
          Delete
        </h1>
      </div>
    </div>
  ) : (
    // Details
    <div className="w-2/12 bg-white flex flex-col my-6 gap-8 px-6 transition-all duration-500 ease-in-out">
      <div className="flex items-start gap-4 w-full">
        <RiArrowLeftSLine onClick={e => setIsFilesOpen(false)} size={25} className="cursor-pointer" />
        <h1 className="text-black font-semibold tracking-wider">
          Media, Files & Links
        </h1>
      </div>
      <div className="flex items-center justify-around w-full h-14 bg-slate-200 rounded-2xl">
        {tabs.map((tab, index) => (
          <h1
            key={index}
            onClick={() => setCurrentTab(index)}
            className={`text-black tracking-wider font-normal text-sm cursor-pointer px-5 py-2 rounded-xl ${
              currentTab === index && "bg-slate-300"
            } hover:bg-slate-300 hover:text-white transition-all duration-500 ease-in-out`}
          >
            {tab}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default ConversationAttachments;
