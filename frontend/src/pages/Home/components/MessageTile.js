import React, { useState } from "react";
import { HiDotsVertical, HiEmojiHappy } from "react-icons/hi";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const MessageTile = ({ message }) => {
  const [isMsgHovered, setIsMsgHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);

  return (
    <div
      className={`flex mb-3 ${
        message.isMine ? "justify-end" : "justify-start"
      }`}
    >
      {message.isMine ? (
        <div
          onMouseEnter={(e) => setIsMsgHovered(true)}
          onMouseLeave={(e) => {
            setIsMsgHovered(false);
            setIsEmojiHovered(false);
          }}
          className="flex items-center gap-3"
        >
          {isMsgHovered && (
            <div className="flex items-center gap-3">
              <HiDotsVertical
                fontSize={18}
                className="fill-slate-300 hover:fill-black cursor-pointer"
              />
              <HiEmojiHappy
                onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                fontSize={20}
                className=" fill-slate-300 hover:fill-black cursor-pointer"
              />
              {isEmojiHovered && (
                <div className="absolute">
                  <Picker
                    set="facebook"
                    title=""
                    perLine={6}
                    sheetSize={32}
                    showPreview={false}
                    showSkinTones={false}
                  />
                </div>
              )}
            </div>
          )}
          <div className="bg-blue-300 flex items-center max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-bl-xl mr-8">
            <h1 className="text-black tracking-wider text-sm">
              {message.text}
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-slate-300 flex items-center max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-br-xl ml-8">
          <h1 className="text-black tracking-wider text-sm">{message.text}</h1>
        </div>
      )}
    </div>
  );
};

export default MessageTile;
