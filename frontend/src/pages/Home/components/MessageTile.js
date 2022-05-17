import React, { useState } from "react";
import { HiDotsVertical, HiEmojiHappy } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdReply } from "react-icons/md";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import { Modal, Tooltip } from "@nextui-org/react";
import User from "@nextui-org/react/user";
import profileHolder from "../../../assets/profile_placeholder.png";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Popover } from "@nextui-org/react";
import FullImageView from "./FullImageView";
import { isValidHttpUrl } from "../../../helpers/isValidHttpUrl";
import LinkPreview from "../../../components/LinkPreview";
import { addReact } from "../../../services/message_services";

const MessageTile = ({ message, conversationId }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isMsgHovered, setIsMsgHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(
    message.reactions[0] ?? null
  );
  const [isShowingEmojis, setIsShowingEmojis] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const handleOnImageClick = (e, image) => {
    e.preventDefault();
    setSelectedImage(image);
    setIsImageClicked(true);
  };

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
          className={`relative flex items-center gap-3  ${
            selectedEmoji !== null ? "mb-2" : "mb-0"
          }`}
        >
          {isMsgHovered && (
            <div className="flex items-center gap-3">
              <Moment
                format="MMMM Do YYYY, h:mm a"
                className="text-slate-500 text-sm"
              >
                {message.createdAt}
              </Moment>
              <Tooltip content="More" color="invert" placement="top">
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
              </Tooltip>

              <Tooltip content="Star" color="invert" placement="top">
                <AiFillStar
                  onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                  fontSize={20}
                  className=" fill-slate-300 hover:fill-black cursor-pointer"
                />
              </Tooltip>

              <Tooltip content="React" color="invert" placement="top">
                <HiEmojiHappy
                  onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                  fontSize={20}
                  className=" fill-slate-300 hover:fill-black cursor-pointer"
                />
              </Tooltip>

              {isEmojiHovered && (
                <div className="absolute z-50 top-10 -left-5">
                  <Picker
                    set="facebook"
                    title=""
                    perLine={6}
                    sheetSize={32}
                    showPreview={false}
                    showSkinTones={false}
                    onSelect={async (emoji) => {
                      setSelectedEmoji(emoji);
                      await addReact(message.id, emoji, currentUser.id);
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="bg-blue-300 flex flex-col items-start max-w-xl py-2 w-fit px-4 rounded-t-xl rounded-bl-xl mr-8">
            {message.attachments.length > 0 && (
              <div className="flex items-center gap-4">
                {/* Full Message Image view */}
                {isImageClicked && (
                  <FullImageView
                    image={selectedImage}
                    conversationId={conversationId}
                    isImageClicked={isImageClicked}
                    setIsImageClicked={setIsImageClicked}
                  />
                )}
                {message.attachments.map((attachment) =>
                  attachment.type === "jpg" ||
                  attachment.type === "png" ||
                  attachment.type === "jpeg" ? (
                    <div key={attachment.id}>
                      <img
                        onClick={(e) => handleOnImageClick(e, attachment)}
                        src={attachment.url}
                        className="w-32 h-32 object-cover rounded-xl cursor-pointer bg-blue-200 hover:scale-95 transition-all duration-400 ease-in-out"
                      />
                    </div>
                  ) : attachment.type === "video" ? (
                    <video
                      src={attachment.url}
                      autoPlay={false}
                      controls
                      className="w-full h-40 rounded-2xl"
                    />
                  ) : attachment.type === "mp3" ||
                    attachment.type === "pcm" ||
                    attachment.type === "wav" ||
                    attachment.type === "aiff" ||
                    attachment.type === "acc" ? (
                    <audio
                      src={attachment.url}
                      autoPlay={false}
                      controls
                      className="h-10 opacity-80"
                    />
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
            {message.text && isValidHttpUrl(message.text) ? (
              <LinkPreview url={message.text} />
            ) : (
              <h1
                className={`text-black tracking-wider text-sm ${
                  message.attachments.length > 0 && "mt-2"
                }`}
              >
                {message.text}
              </h1>
            )}
          </div>
          {message.reactions[0] !== undefined && (
            <div
              onClick={(e) => setIsShowingEmojis(true)}
              className="absolute flex z-50 right-9 -bottom-3 rounded-full items-center justify-center p-0.5 cursor-pointer shadow-sm bg-white"
            >
              <Emoji emoji={selectedEmoji} size={18} />
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
          className={`relative flex items-center gap-3  ${
            selectedEmoji !== null ? "mb-2" : "mb-0"
          }`}
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
            {message.text && isValidHttpUrl(message.text) ? (
              <LinkPreview url={message.text} />
            ) : (
              <h1
                className={`text-black tracking-wider text-sm ${
                  message.attachments.length > 0 && "mt-2"
                }`}
              >
                {message.text}
              </h1>
            )}
            {message.reactions[0] !== undefined && (
              <div
                onClick={(e) => setIsShowingEmojis(true)}
                className="absolute flex z-50 left-9 -bottom-3 rounded-full items-center justify-center p-1 cursor-pointer shadow-sm bg-white"
              >
                <Emoji emoji={selectedEmoji} size={18} />
              </div>
            )}
          </div>
          {isMsgHovered && (
            <div className="flex items-center gap-3">
              <Tooltip content="React" color="invert" placement="top">
                <HiEmojiHappy
                  onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                  fontSize={20}
                  className=" fill-slate-300 hover:fill-black cursor-pointer"
                />
              </Tooltip>
              <Tooltip content="Star" color="invert" placement="top">
                <AiFillStar
                  onClick={(e) => setIsEmojiHovered(!isEmojiHovered)}
                  fontSize={20}
                  className=" fill-slate-300 hover:fill-black cursor-pointer"
                />
              </Tooltip>
              <Tooltip content="More" color="invert" placement="top">
                <HiDotsVertical
                  fontSize={18}
                  className="fill-slate-300 hover:fill-black cursor-pointer"
                />
              </Tooltip>

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
                    onSelect={async (emoji) => {
                      setSelectedEmoji(emoji);
                      await addReact(message.id, emoji, currentUser.id);
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
          <div className="flex flex-col flex-grow px-4 max-h-96 my-8 overflow-auto">
            {message.reactions.map((reaction) => (
              <div className="flex items-center justify-between w-full h-20 px-4 bg-white hover:bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <User
                    // src={profileHolder}
                    src={
                      reaction.user.profile === ""
                        ? profileHolder
                        : reaction.user.profile
                    }
                    zoomed="true"
                    bordered
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="text-black font-semibold tracking-wider">
                      {reaction.user.username}
                    </h1>
                    <h1 className="text-slate-300 tracking-wider text-sm">
                      Click to remove
                    </h1>
                  </div>
                </div>
                <Emoji emoji={reaction} size={28} />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MessageTile;
