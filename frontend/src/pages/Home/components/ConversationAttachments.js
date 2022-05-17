import React, { useState } from "react";
import { useSelector } from "react-redux";
import profileHolder from "../../../assets/profile_placeholder.png";
import {
  BsFileEarmarkBinaryFill,
  BsFileEarmarkImageFill,
} from "react-icons/bs";
import { RiLinksFill } from "react-icons/ri";
import AttachmentsDetails from "./AttachmentsDetails";
import { MdVideoLibrary } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";

const tabs = ["Media", "Files", "Star"];

const ConversationAttachments = ({ conversation }) => {
  const { user } = useSelector((state) => state.auth);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [currentFiles, setCurrentFiles] = useState("");

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
        <h1 className="text-black tracking-wider font-semibold w-full text-sm cursor-pointer py-3 px-2 rounded-lg hover:bg-sky-100">
          Star messages
        </h1>
        <h1 className="text-black font-semibold tracking-wider w-full text-sm py-3 px-2 rounded-lg hover:bg-sky-100">
          Media, files & links
        </h1>
        {[
          {
            name: "Images",
            icon: <BsFileEarmarkImageFill size={20} />,
            onClick: () => setCurrentFiles("images"),
          },
          {
            name: "Videos",
            icon: <MdVideoLibrary size={20} />,
            onClick: () => setCurrentFiles("videos"),
          },
          {
            name: "Audios",
            icon: <AiFillAudio size={20} />,
            onClick: () => setCurrentFiles("audios"),
          },
          {
            name: "Files",
            icon: <BsFileEarmarkBinaryFill size={20} />,
            onClick: () => setCurrentFiles("files"),
          },
          {
            name: "Links",
            icon: <RiLinksFill size={20} />,
            onClick: () => setCurrentFiles("links"),
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setIsFilesOpen(!isFilesOpen);
              item.onClick();
            }}
            className="w-full flex items-center py-3 px-2 rounded-lg gap-2 cursor-pointer hover:bg-sky-100"
          >
            {item.icon}
            <h1 className="text-black tracking-wider text-sm font-semibold">
              {item.name}
            </h1>
          </div>
        ))}

        <h1 className="text-red-400 tracking-wider font-semibold text-sm w-full cursor-pointer py-3 px-2 rounded-lg hover:bg-sky-100">
          Clear chat
        </h1>
        <h1 className="text-red-400 tracking-wider font-semibold text-sm w-full cursor-pointer py-3 px-2 rounded-lg hover:bg-sky-100">
          Delete
        </h1>
      </div>
    </div>
  ) : (
    // Details
    <AttachmentsDetails
      conversationId={conversation.id}
      currentFiles={currentFiles}
      setIsFilesOpen={setIsFilesOpen}
    />
  );
};

export default ConversationAttachments;
