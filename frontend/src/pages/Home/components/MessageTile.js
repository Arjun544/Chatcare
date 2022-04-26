import React, { useState } from "react";
import { HiDotsVertical, HiEmojiHappy } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import { Modal } from "@nextui-org/react";
import User from "@nextui-org/react/user";
import profileHolder from "../../../assets/profile_placeholder.png";
import { useSelector } from "react-redux";

const MessageTile = ({ message }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isMsgHovered, setIsMsgHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isShowingEmojis, setIsShowingEmojis] = useState(false);

  return (
    <div
      className={`flex mb-3 ${
       message.senderId === currentUser.id  ? "justify-end" : "justify-start"
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
              <HiDotsVertical
                fontSize={18}
                className="fill-slate-300 hover:fill-black cursor-pointer"
              />
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
          <div className="bg-blue-300 flex items-center max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-bl-xl mr-8">
            <h1 className=" text-black tracking-wider text-sm">
              {message.text}
            </h1>
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
          <div className="bg-slate-300 flex items-center max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-br-xl ml-8">
            <h1 className="text-black tracking-wider text-sm">
              {message.text}
            </h1>
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
