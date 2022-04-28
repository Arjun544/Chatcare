import React, { useEffect, useState } from "react";
import { Popover } from "@nextui-org/react";
import { Picker } from "emoji-mart";
import { useFilePicker } from "use-file-picker";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { RiAttachment2, RiMicFill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import Tooltip from "@nextui-org/react/tooltip";
import { HiEmojiHappy } from "react-icons/hi";
import AudioDialogue from "./AudioDialogue";

const MessageInput = ({ text, setText, sendMessage }) => {
  const [files, setFiles] = useState([]);
  const [isAudioDialogueOpen, setIsAudioDialogueOpen] = useState(false);
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    multiple: true,
    readAs: "DataURL",
    accept: [
      ".json",
      ".pdf",
      ".png",
      ".jpg",
      ".jpeg",
      ".docx",
      ".doc",
      ".xlsx",
      ".xls",
      ".ppt",
      ".pptx",
      ".txt",
      ".csv",
      ".mp4",
      ".mp3",
      ".zip",
      ".rar",
    ],
    // limitFilesConfig: { min: 2, max: 3 },
    // minFileSize: 1, // in megabytes
    // maxFileSize: 1,
    // readFilesContent: false, // ignores file content
  });

  useEffect(() => {
    setFiles([...files, ...filesContent]);
  }, [filesContent]);

  const removeFile = (e, file) => {
    e.preventDefault();
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div
      className={`flex w-full bg-white shadow-sm px-8 ${
        files.length > 0
          ? "h-36 flex flex-col"
          : "flex items-center justify-between h-20"
      }`}
    >
      {files.length > 0 && (
        <div className="flex flex-wrap items-center w-full h-fit px-3 bg-slate-300 rounded-2xl my-3">
          {files.map((file) => (
            <div className="relative">
              {file.name.split(".")[1] === "jpg" ||
              file.name.split(".")[1] === "png" ||
              file.name.split(".")[1] === "jpeg" ? (
                <img src={file.content} alt="preview" className="h-11 w-14" />
              ) : (
                <div className="flex items-center gap-2 w-fit bg-white h-10 mr-4 px-4 my-3 rounded-xl">
                  <BsFillFileEarmarkFill />
                  <h1 className="text-xs font-semibold tracking-wider">
                    {file.name}
                  </h1>
                </div>
              )}
              <div
                onClick={(e) => removeFile(e, file)}
                className={`absolute flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-red-100 hover:bg-red-200 ${
                  file.name.split(".")[1] === "jpg" ||
                  file.name.split(".")[1] === "png" ||
                  file.name.split(".")[1] === "jpeg"
                    ? "-right-1 -top-1"
                    : "right-3 top-1"
                }`}
              >
                <MdOutlineClose />
              </div>
            </div>
          ))}
          <div
            onClick={(e) => openFileSelector()}
            className="flex items-center justify-center h-11 w-11 ml-6 rounded-xl bg-slate-400 cursor-pointer hover:bg-slate-500"
          >
            <BiImageAdd size={24} fill="#fff" />
          </div>
        </div>
      )}

      <form
        action="submit"
        onSubmit={(e) => sendMessage(e)}
        className="flex w-full"
      >
        <Tooltip content="Select attachment" color="invert" placement="top">
          <RiAttachment2
            onClick={(e) => openFileSelector()}
            fontSize={35}
            className="bg-blue-200 py-2 px-2 rounded-full hover:bg-blue-300 cursor-pointer transition-all duration-700 ease-in-out"
          />
        </Tooltip>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          required
          placeholder="Type a new message..."
          className="flex flex-grow mx-6 placeholder:text-sm text-sm tracking-wider font-medium text-black"
        />
        <div className="flex items-center gap-10">
          <Popover placement="top" triggerType="listbox">
            <Popover.Trigger>
              <i>
                <Tooltip
                  content="Choose an emoji"
                  color="invert"
                  placement="top"
                >
                  <HiEmojiHappy
                    fontSize={22}
                    className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
                  />
                </Tooltip>
              </i>
            </Popover.Trigger>
            <Popover.Content className="flex flex-col p-4 bg-transparent shadow-none">
              <Picker
                set="facebook"
                title=""
                perLine={6}
                sheetSize={32}
                showPreview={false}
                showSkinTones={false}
                onSelect={(emoji) => {
                  const newText = text + emoji.native;
                  setText(newText);
                }}
              />
            </Popover.Content>
          </Popover>
          <Tooltip content="Send voice" color="invert" placement="top">
            <RiMicFill
              onClick={() => setIsAudioDialogueOpen(true)}
              fontSize={22}
              className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
            />
          </Tooltip>

          <button type="submit">
            <IoIosSend
              fontSize={35}
              className="bg-green-400 py-2 px-2 rounded-full hover:bg-green-500 cursor-pointer transition-all duration-700 ease-in-out"
            />
          </button>
        </div>
      </form>
      {isAudioDialogueOpen && (
        <AudioDialogue
          isAudioDialogueOpen={isAudioDialogueOpen}
          setIsAudioDialogueOpen={setIsAudioDialogueOpen}
        />
      )}
    </div>
  );
};

export default MessageInput;
