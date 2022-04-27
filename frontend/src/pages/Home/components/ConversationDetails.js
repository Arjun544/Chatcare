import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import User from "@nextui-org/react/user";
import Lottie from "lottie-react";
import newMessage from "../../../assets/new-message.json";
import { IoIosVideocam, IoIosSend } from "react-icons/io";
import {
  RiPhoneFill,
  RiSearch2Fill,
  RiAttachment2,
  RiMicFill,
} from "react-icons/ri";
import { HiDotsVertical, HiEmojiHappy } from "react-icons/hi";
import profileHolder from "../../../assets/profile_placeholder.png";
import { StageSpinner } from "react-spinners-kit";
import MessageTile from "./MessageTile";
import { sendMessage } from "../../../services/message_services";
import { useSelector } from "react-redux";
import { AppContext } from "../../Main";
import { createConversation } from "../../../services/conversation_services";

const ConversationDetails = ({ conversation }) => {
  const { user } = useSelector((state) => state.auth);
  const { chatConversations, chatConversationsRefetch } =
    useContext(AppContext);
  const scrollRef = useRef(null);
  const [text, setText] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const scrollToBottom = () => {
    const scroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    scrollRef.current.scrollTo(0, scroll);
  };

  useLayoutEffect(() => {
    conversation !== null && scrollToBottom();
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const receiverId = conversation.members.find(
      (member) => member.id !== user.id
    ).id;
    chatConversations.includes(conversation)
      ? await sendMessage(text, receiverId, user.id, conversation.id)
      : await createConversation(user.id, receiverId, text);
    await chatConversationsRefetch();
    setText("");
    scrollToBottom();
  };

  return (
    <>
      {conversation === null ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-60 w-60 items-center justify-center">
            <Lottie animationData={newMessage} autoPlay={true} loop={true} />
          </div>
          <span className="tracking-wider text-slate-400">
            Select a conversation
          </span>
        </div>
      ) : (
        <div className="flex flex-col flex-grow bg-white shadow-sm overflow-hidden">
          <div className="flex bg-white w-full h-20 justify-between items-center px-8 shadow-md">
            <div className="flex items-center">
              <User
                src={
                  conversation.members.find((member) => member.id !== user.id)
                    .profile === ""
                    ? profileHolder
                    : conversation.members.find(
                        (member) => member.id !== user.id
                      ).profile
                }
                zoomed="true"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-black tracking-wider">
                  {
                    conversation.members.find((member) => member.id !== user.id)
                      .username
                  }
                </h1>
                {isTyping ? (
                  <h1 className="text-green-400 font-medium tracking-wider text-xs">
                    typing...
                  </h1>
                ) : isOnline ? (
                  <h1 className="text-green-400 font-medium tracking-wider text-xs">
                    Online
                  </h1>
                ) : (
                  <h1 className="text-slate-300 text-xs tracking-wider font-medium">
                    Offline
                  </h1>
                )}
              </div>
            </div>
            <div className="flex items-center gap-10">
              <IoIosVideocam
                fontSize={24}
                className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
              />
              <RiPhoneFill
                fontSize={22}
                className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
              />
              <RiSearch2Fill
                fontSize={22}
                className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
              />
              <HiDotsVertical
                fontSize={22}
                className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
              />
            </div>
          </div>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex flex-col h-full w-full bg-slate-200 py-4 overflow-y-auto"
          >
            {conversation.messages < 1 ? (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex h-60 w-60 items-center justify-center">
                  <Lottie
                    animationData={newMessage}
                    autoPlay={true}
                    loop={true}
                  />
                </div>
                <span className="tracking-wider text-slate-400">
                  Start a conversation
                </span>
              </div>
            ) : (
              conversation.messages.map((message, index) => (
                <MessageTile key={index} message={message} />
              ))
            )}
            {isTyping && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <h1 className="text-slate-400 tracking-wider text-sm">
                  {
                    conversation.members.find((member) => member.id !== user.id)
                      .username
                  }
                  is typing
                </h1>
                <StageSpinner sty size={30} color="#44C7F4" loading={true} />
              </div>
            )}
          </div>
          {/* Typing Input */}
          <div className="flex items-center w-full h-20 justify-between bg-white shadow-sm px-8">
            <RiAttachment2
              fontSize={35}
              className="bg-blue-200 py-2 px-2 rounded-full hover:bg-blue-300 cursor-pointer transition-all duration-700 ease-in-out"
            />
            <form
              action="submit"
              onSubmit={(e) => handleSendMessage(e)}
              className="flex w-full"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                required
                placeholder="Type a new message..."
                className="flex flex-grow mx-6 placeholder:text-sm text-sm tracking-wider font-medium text-black"
              />
              <div className="flex items-center gap-10">
                <HiEmojiHappy
                  fontSize={22}
                  className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
                />
                <RiMicFill
                  fontSize={22}
                  className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
                />
                <button type="submit">
                  <IoIosSend
                    fontSize={35}
                    className="bg-green-400 py-2 px-2 rounded-full hover:bg-green-500 cursor-pointer transition-all duration-700 ease-in-out"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationDetails;
