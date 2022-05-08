import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import User from "@nextui-org/react/user";
import Lottie from "lottie-react";
import newMessage from "../../../assets/new-message.json";
import { IoIosVideocam } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";

import { RiPhoneFill, RiSearch2Fill } from "react-icons/ri";

import profileHolder from "../../../assets/profile_placeholder.png";
import { StageSpinner } from "react-spinners-kit";
import MessageTile from "./MessageTile";
import { sendMessage } from "../../../services/message_services";
import { useSelector } from "react-redux";
import { AppContext } from "../../Main";
import {
  createConversation,
  getConversationMessages,
} from "../../../services/conversation_services";
import Tooltip from "@nextui-org/react/tooltip";
import MessageInput from "./MessageInput";
import { getBase64 } from "../../../helpers/getBase64";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import MessagesLoader from "../../../loaders/MessagesLoader";

const ConversationDetails = ({
  conversation,
  isAttachmentsOpen,
  setIsAttachmentsOpen,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { chatConversations, chatConversationsRefetch } =
    useContext(AppContext);
  const scrollRef = useRef(null);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const {
    isLoading: isMessagesLoading,
    data: messages,
    refetch: messagesRefetch,
    isError: isMessagesError,
  } = useQuery(
    ["messages"],
    async () => {
      const response = await getConversationMessages(conversation.id);
      console.log(response.data.messages);
      return response.data.messages;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

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
    try {
      const receiverId = conversation.members.find(
        (member) => member.id !== user.id
      ).id;
      const attachments = files.map((file) => ({
        url: file.base64,
        name: file.name,
        type: file.type,
      }));
      chatConversations.includes(conversation)
        ? await sendMessage(
            text,
            attachments,
            receiverId,
            user.id,
            conversation.id
          )
        : await createConversation(user.id, receiverId, text, attachments);
      await chatConversationsRefetch();
      setText("");
      setFiles([]);
      scrollToBottom();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white shadow-sm overflow-hidden">
      <div className="flex bg-white w-full h-20 justify-between items-center px-8 shadow-md">
        <div className="flex items-center">
          <User
            src={
              conversation.members.find((member) => member.id !== user.id)
                .profile === ""
                ? profileHolder
                : conversation.members.find((member) => member.id !== user.id)
                    .profile
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
          <Tooltip content="Video call" color="invert" placement="bottom">
            <IoIosVideocam
              fontSize={24}
              className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
            />
          </Tooltip>
          <Tooltip content="Audio call" color="invert" placement="bottom">
            <RiPhoneFill
              fontSize={22}
              className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
            />
          </Tooltip>
          <Tooltip
            content="Search conversation"
            color="invert"
            placement="bottom"
          >
            <RiSearch2Fill
              fontSize={22}
              className="fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out"
            />
          </Tooltip>
          <TiArrowSortedDown
            onClick={(e) => setIsAttachmentsOpen(!isAttachmentsOpen)}
            fontSize={25}
            className={`fill-slate-300 hover:fill-black cursor-pointer transition-all duration-700 ease-in-out ${
              isAttachmentsOpen ? "-rotate-90" : "rotate-90"
            }`}
          />
        </div>
      </div>
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-col h-full w-full bg-slate-200 py-4 overflow-y-auto"
      >
        {isMessagesLoading ? (
          <MessagesLoader />
        ) : messages < 1 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-60 w-60 items-center justify-center">
              <Lottie animationData={newMessage} autoPlay={true} loop={true} />
            </div>
            <span className="tracking-wider text-slate-400">
              Start a conversation
            </span>
          </div>
        ) : (
          <div>
           { messages && messages.map((message, index) => (
            <MessageTile key={index} message={message} conversationId={conversation.id} />
            ))}
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
        )}
      </div>
      {/* Typing Input */}
      <MessageInput
        text={text}
        setText={setText}
        sendMessage={handleSendMessage}
        files={files}
        setFiles={setFiles}
      />
    </div>
  );
};

export default ConversationDetails;
