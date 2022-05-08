import React, { useCallback, useEffect, useState } from "react";
import { Popover } from "@nextui-org/react";
import { Picker } from "emoji-mart";
import { IoIosSend } from "react-icons/io";
import { SiAddthis } from "react-icons/si";
import { RiAttachment2, RiMicFill, RiCloseFill } from "react-icons/ri";
import Tooltip from "@nextui-org/react/tooltip";
import { HiEmojiHappy } from "react-icons/hi";
import AudioDialogue from "./AudioDialogue";
import FileBase64 from "react-file-base64";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdAudiotrack, MdVideoLibrary } from "react-icons/md";

const MessageInput = ({ text, setText, sendMessage, files, setFiles }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const [isAudioDialogueOpen, setIsAudioDialogueOpen] = useState(false);

  const handleRemoveFile = (e, file) => {
    e.preventDefault();
    setFiles(files.filter((item) => item !== file));
  };

  return (
    <div
      className={`flex bg-white shadow-sm transition-all duration-500 ease-in-out ${
        isAttachmentsOpen
          ? "flex justify-between flex-col pb-4"
          : "flex items-center justify-between h-20"
      }`}
    >
      {isAttachmentsOpen && (
        <div className="flex gap-4">
          {/* Add file button */}
          <div className="flex items-center justify-center h-12 w-12 my-3 ml-3 cursor-pointer rounded-xl bg-slate-200 hover:bg-slate-300 transition-all duration-500 ease-in-out">
            <div className="flex items-center justify-center h-full w-full opacity-0 cursor-pointer overflow-hidden">
              <FileBase64
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onDone={(files) =>
                  setFiles((newFiles) => [...newFiles, ...files])
                }
              />
            </div>
            <SiAddthis
              fontSize={22}
              className="absolute z-0 cursor-pointer pointer-events-none"
            />
          </div>
          {/* Remove file button */}
          {files.length > 0 && (
            <div
              onClick={(e) => setFiles([])}
              className="flex relative items-center justify-center h-12 w-12 my-3 rounded-xl bg-red-200 cursor-pointer hover:bg-red-300 transition-all duration-500 ease-in-out"
            >
              <RiCloseFill fontSize={22} />
            </div>
          )}
          {/* Files grid */}
          <div className="grid grid-flow-row-dense grid-cols-4 h-40 py-3 bg-white overflow-auto">
            {files.length > 0 &&
              files.map((file, index) => (
                <div key={index} className="flex relative mr-4 mb-2">
                  {file.name.split(".")[1] === "jpg" ||
                  file.name.split(".")[1] === "png" ||
                  file.name.split(".")[1] === "jpeg" ? (
                    <img
                      src={URL.createObjectURL(file.file)}
                      alt={file.name}
                      className="h-12 w-12 object-cover rounded-xl "
                    />
                  ) : file.name.split(".")[1] === "mp4" ||
                    file.name.split(".")[1] === "mkv" ||
                    file.name.split(".")[1] === "mov" ||
                    file.name.split(".")[1] === "wmv" ||
                    file.name.split(".")[1] === "flv" ||
                    file.name.split(".")[1] === "avi" ||
                    file.name.split(".")[1] === "webm" ||
                    file.name.split(".")[1] === "AVCHD" ? (
                    <div
                      key={index}
                      className={`flex items-center justify-center rounded-xl gap-4 w-60 px-4 h-12 ${
                        file.size.split(" ")[0] > 100000
                          ? "bg-red-400"
                          : "bg-slate-300 "
                      }`}
                    >
                      <MdVideoLibrary size={19} />
                      <div className="flex flex-col">
                        <h1 className=" text-xs font-semibold tracking-wider line-clamp-1">
                          {file.name}
                        </h1>
                        <h1 className="text-xs font-semibold tracking-wider text-green-500">
                          {file.size}
                        </h1>
                      </div>
                    </div>
                  ) : file.name.split(".")[1] === "mp3" ||
                    file.name.split(".")[1] === "pcm" ||
                    file.name.split(".")[1] === "wav" ||
                    file.name.split(".")[1] === "aiff" ||
                    file.name.split(".")[1] === "acc" ? (
                    <div
                      key={index}
                      className={`flex items-center justify-center rounded-xl gap-4 w-60 px-4 h-12 ${
                        file.size.split(" ")[0] > 5000
                          ? "bg-red-400"
                          : "bg-slate-300 "
                      }`}
                    >
                      <MdAudiotrack size={19} />
                      <div className="flex flex-col">
                        <h1 className=" text-xs font-semibold tracking-wider line-clamp-1">
                          {file.name}
                        </h1>
                        <h1 className=" text-xs font-semibold tracking-wider text-green-500">
                          {file.size}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={`flex flex-grow items-center justify-start rounded-xl gap-4 w-60 px-4 h-12 ${
                        file.size.split(" ")[0] > 5000
                          ? "bg-red-400"
                          : "bg-slate-300 "
                      }`}
                    >
                      <BsFileEarmarkMedicalFill className="h-6 w-6" />
                      <div className="flex flex-col">
                        <h1 className=" text-xs font-semibold tracking-wider line-clamp-1">
                          {file.name}
                        </h1>
                        <h1 className=" text-xs font-semibold tracking-wider text-green-500">
                          {file.size}
                        </h1>
                      </div>
                    </div>
                  )}
                  <div
                    onClick={(e) => handleRemoveFile(e, file)}
                    className={
                      "absolute z-50 -top-2 flex h-5 w-5 rounded-full bg-white hover:bg-slate-200 cursor-pointer items-center justify-center left-0"
                    }
                  >
                    <RiCloseFill />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <form
        action="submit"
        onSubmit={(e) => sendMessage(e)}
        className="flex flex-grow mx-4"
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
          required={files.length > 0 ? false : true}
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
