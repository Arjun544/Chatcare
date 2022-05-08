import React, { useState } from "react";
import { HiDotsVertical, HiEmojiHappy } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdAudiotrack, MdReply, MdVideoLibrary } from "react-icons/md";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import { Modal } from "@nextui-org/react";
import User from "@nextui-org/react/user";
import profileHolder from "../../../assets/profile_placeholder.png";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Popover } from "@nextui-org/react";
import FullImageView from "./FullImageView";

const MessageTile = ({ message, conversationId }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isMsgHovered, setIsMsgHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isShowingEmojis, setIsShowingEmojis] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);

  return (
    <div
      className={`flex mb-3 ${
        message.senderId === currentUser.id ? "justify-end" : "justify-start"
      }`}
    >
      {message.senderId === currentUser.id ? (
        <div
          onMouseEnter={(e) => setIsMsgHovered(true)}
          onMouseLeave={(e) => {
            setIsMsgHovered(false);
            setIsEmojiHovered(false);
          }}
          className="relative flex items-center gap-3 "
        >
          {isMsgHovered && (
            <div className="flex items-center gap-3">
              <Moment
                format="MMMM Do YYYY, h:mm a"
                className="text-slate-500 text-sm"
              >
                {message.createdAt}
              </Moment>
              <Popover placement="left-top" triggerType="listbox">
                <Popover.Trigger>
                  <i>
                    <HiDotsVertical
                      fontSize={20}
                      className=" fill-slate-300 hover:fill-black cursor-pointer"
                    />
                  </i>
                </Popover.Trigger>
                <Popover.Content className="flex flex-col p-4 gap-2">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-400">
                    <IoMdTrash size={19} />
                    <h1 className="text-black tracking-wider text-sm hover:text-red-400">
                      Remove
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-sky-400">
                    <MdReply size={19} />
                    <h1 className="text-black tracking-wider text-sm hover:text-sky-400">
                      Reply
                    </h1>
                  </div>
                </Popover.Content>
              </Popover>
              <AiFillStar
                onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                fontSize={20}
                className=" fill-slate-300 hover:fill-black cursor-pointer"
              />
              <HiEmojiHappy
                onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                fontSize={20}
                className=" fill-slate-300 hover:fill-black cursor-pointer"
              />
              {isEmojiHovered && (
                <div className="absolute z-50 top-10 right-20">
                  <Picker
                    set="facebook"
                    title=""
                    perLine={6}
                    sheetSize={32}
                    showPreview={false}
                    showSkinTones={false}
                    onSelect={(emoji) => {
                      setSelectedEmoji(emoji);
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="bg-blue-300 flex flex-col items-start max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-bl-xl mr-8">
            {message.attachments.length > 0 && (
              <div className="flex items-center gap-4">
                {message.attachments.map((attachment) =>
                  attachment.type === "jpg" ||
                  attachment.type === "png" ||
                  attachment.type === "jpeg" ? (
                    <div key={attachment.id}>
                      {/* Full Message Image view */}
                      <FullImageView
                        image={attachment}
                        isImageClicked={isImageClicked}
                        setIsImageClicked={setIsImageClicked}
                      />
                      <img
                        onClick={(e) => setIsImageClicked(true)}
                        src={attachment.url}
                        className="w-32 h-32 object-cover rounded-xl cursor-pointer bg-blue-200 hover:scale-95 transition-all duration-400 ease-in-out"
                      />
                    </div>
                  ) : attachment.type === "mp4" ||
                    attachment.type === "mkv" ||
                    attachment.type === "mov" ||
                    attachment.type === "wmv" ||
                    attachment.type === "flv" ||
                    attachment.type === "avi" ||
                    attachment.type === "webm" ||
                    attachment.type === "AVCHD" ? (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-center rounded-xl gap-2 bg-slate-300 p-2 px-4 h-12 text-xs font-semibold tracking-wider cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
                    >
                      <MdVideoLibrary size={19} />
                      {attachment.name}
                    </div>
                  ) : attachment.type === "mp3" ||
                    attachment.type === "pcm" ||
                    attachment.type === "wav" ||
                    attachment.type === "aiff" ||
                    attachment.type === "acc" ? (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-center rounded-xl gap-2 bg-slate-300 p-2 px-4 h-12 text-xs font-semibold tracking-wider cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
                    >
                      <MdAudiotrack size={19} />
                      {attachment.name}
                    </div>
                  ) : (
                    <a
                      key={attachment.id}
                      href={
                        attachment.type === "pdf" ? attachment.url : "false"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl gap-2 bg-slate-300 p-2 px-4 h-12 text-xs font-semibold tracking-wider cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
                    >
                      <BsFileEarmarkMedicalFill size={19} />
                      {attachment.name}
                    </a>
                  )
                )}
              </div>
            )}
            {message.text && (
              <h1
                className={`text-black tracking-wider text-sm ${
                  message.attachments.length > 0 && "mt-2"
                }`}
              >
                {message.text}
              </h1>
            )}
          </div>
          {selectedEmoji !== null && (
            <div
              onClick={(e) => setIsShowingEmojis(true)}
              className="absolute flex z-50 right-9 -bottom-3 rounded-full items-center justify-center p-1 cursor-pointer shadow-sm bg-white"
            >
              <Emoji emoji={selectedEmoji} size={15} />
            </div>
          )}
        </div>
      ) : (
        <div
          onMouseEnter={(e) => setIsMsgHovered(true)}
          onMouseLeave={(e) => {
            setIsMsgHovered(false);
            setIsEmojiHovered(false);
          }}
          className="relative flex items-center gap-3"
        >
          <div className="bg-slate-300 flex flex-col items-start gap-2 max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-br-xl ml-8">
            {message.attachments.length > 0 && (
              <div className="flex items-center gap-2">
                {message.attachments.map((attachment) =>
                  attachment.type === "jpg" ||
                  attachment.type === "png" ||
                  attachment.type === "jpeg" ? (
                    <img
                      onClick={(e) => setIsImageClicked(true)}
                      key={attachment.id}
                      src={attachment.url}
                      className="w-32 h-32 object-cover rounded-xl cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
                    />
                  ) : (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-center rounded-xl gap-2 bg-slate-300 p-2 px-4 h-12 text-xs font-semibold tracking-wider cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
                    >
                      <BsFileEarmarkMedicalFill size={19} />
                      {attachment.name}
                    </div>
                  )
                )}
              </div>
            )}
            {message.text && (
              <h1 className=" text-black tracking-wider text-sm mt-2">
                {message.text}
              </h1>
            )}
            {selectedEmoji !== null && (
              <div
                onClick={(e) => setIsShowingEmojis(true)}
                className="absolute flex z-50 left-9 -bottom-3 rounded-full items-center justify-center p-1 cursor-pointer shadow-sm bg-white"
              >
                <Emoji emoji={selectedEmoji} size={15} />
              </div>
            )}
          </div>
          {isMsgHovered && (
            <div className="flex items-center gap-3">
              <HiEmojiHappy
                onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                fontSize={20}
                className=" fill-slate-300 hover:fill-black cursor-pointer"
              />
              <AiFillStar
                onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                fontSize={20}
                className=" fill-slate-300 hover:fill-black cursor-pointer"
              />
              <HiDotsVertical
                fontSize={18}
                className="fill-slate-300 hover:fill-black cursor-pointer"
              />
              <Moment
                format="MMMM Do YYYY, h:mm a"
                className="text-slate-500 text-sm"
              >
                {message.createdAt}
              </Moment>
              {isEmojiHovered && (
                <div className="absolute z-50 top-10 left-20">
                  <Picker
                    set="facebook"
                    title=""
                    perLine={6}
                    sheetSize={32}
                    showPreview={false}
                    showSkinTones={false}
                    onSelect={(emoji) => {
                      console.log(emoji);
                      setSelectedEmoji(emoji);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {isShowingEmojis && (
        <Modal
          width="40%"
          closeButton
          blur
          aria-labelledby="modal-title"
          open={isShowingEmojis}
          onClose={(e) => setIsShowingEmojis(false)}
        >
          <h1 className="text-black tracking-wider font-semibold">
            Message reactions
          </h1>
          <div className="flex flex-grow px-4 h-60 my-8">
            {message.reactions.map((reaction) => (
              <div className="flex items-center justify-between w-full h-20 px-4 mb-3 bg-white hover:bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <User src={profileHolder} zoomed="true" bordered />
                  <div className="flex flex-col items-start">
                    <h1 className="text-black font-semibold tracking-wider">
                      {reaction.by}
                    </h1>
                    <h1 className="text-slate-300 tracking-wider text-sm">
                      Click to remove
                    </h1>
                  </div>
                </div>
                <Emoji emoji={reaction.emoji} size={28} />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MessageTile;
