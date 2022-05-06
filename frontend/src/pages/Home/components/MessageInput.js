import React, { useCallback, useEffect, useState } from "react";
import { Popover } from "@nextui-org/react";
import { Picker } from "emoji-mart";
import { IoIosSend } from "react-icons/io";
import { SiAddthis } from "react-icons/si";
import { RiAttachment2, RiMicFill, RiCloseFill } from "react-icons/ri";
import Tooltip from "@nextui-org/react/tooltip";
import { HiEmojiHappy } from "react-icons/hi";
import AudioDialogue from "./AudioDialogue";

const MessageInput = ({ text, setText, sendMessage }) => {
  const [files, setFiles] = useState([]);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const [isAudioDialogueOpen, setIsAudioDialogueOpen] = useState(false);

  const handleRemoveFile = (e, file) => {
    e.preventDefault();
    setFiles(files.filter((item) => item !== file));
  };

  return (
    <div
      className={`flex w-full bg-white shadow-sm px-8 transition-all duration-500 ease-in-out ${
        isAttachmentsOpen
          ? "h-fit flex flex-col"
          : "flex items-center justify-between h-20"
      }`}
    >
      {isAttachmentsOpen && (
        <div className="flex flex-row flex-wrap w-fit h-40 bg-white overflow-auto">
          {files.length > 0 &&
            files.map((file, index) => (
              <div className="flex relative mr-4 my-3">
                {file.name.split(".")[1] === "jpg" ||
                file.name.split(".")[1] === "png" ||
                file.name.split(".")[1] === "jpeg" ? (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-12 w-12 object-cover rounded-xl "
                  />
                ) : (
                  <div
                    key={index}
                    className="flex items-center justify-center rounded-xl bg-slate-300 p-2 px-4 h-12 text-xs font-semibold tracking-wider"
                  >
                    {file.name}
                  </div>
                )}
                <div
                  onClick={(e) => handleRemoveFile(e, file)}
                  className={`absolute z-50 -top-2 flex h-5 w-5 rounded-full bg-white hover:bg-slate-200 cursor-pointer items-center justify-center ${
                    file.name.split(".")[1] === "jpg" ||
                    file.name.split(".")[1] === "png" ||
                    file.name.split(".")[1] === "jpeg"
                      ? "right-0"
                      : "right-0"
                  }`}
                >
                  <RiCloseFill />
                </div>
              </div>
            ))}

          <div className="flex relative items-center justify-center h-12 w-12 my-3 rounded-xl bg-slate-200 cursor-pointer hover:bg-slate-300 transition-all duration-500 ease-in-out">
            <input
              type="file"
              name="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              className="h-full w-full opacity-0 cursor-pointer"
              onChange={(e) =>
                setFiles((newFiles) => [...newFiles, ...e.target.files])
              }
            />
            <SiAddthis
              // onClick={(e) => e.target.previousSibling.click()}
              fontSize={22}
              className="absolute z-50 pointer-events-none cursor-pointer"
            />
          </div>
          {files.length > 0 && (
            <div
              onClick={(e) => setFiles([])}
              className="flex relative items-center justify-center h-12 w-12 ml-4 my-3 rounded-xl bg-red-200 cursor-pointer hover:bg-red-300 transition-all duration-500 ease-in-out"
            >
              <RiCloseFill fontSize={22} />
            </div>
          )}
        </div>
      )}

      <form
        action="submit"
        onSubmit={(e) => sendMessage(e)}
        className="flex w-full mb-3"
      >
        <Tooltip content="Select attachment" color="invert" placement="top">
          <RiAttachment2
            onClick={(e) => setIsAttachmentsOpen(!isAttachmentsOpen)}
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
