import React, {
  useContext,
  useEffect,
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
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import MessagesLoader from "../../../loaders/MessagesLoader";
import { customToast } from "../../../helpers/customToast";

const ConversationDetails = ({
  conversation,
  isAttachmentsOpen,
  setIsAttachmentsOpen,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { chatConversations, chatConversationsRefetch } =
    useContext(AppContext);
  const scrollRef = useRef(null);
  const [isMsgSending, setIsMsgSending] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const {
    isLoading,
    data: messages,
  } = useQuery(
    ["messages", conversation],
    async () => {
      const response = await getConversationMessages(conversation.id);
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

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const filesType = files.map((item) => item.type);

    try {
      // Image size is limited to 5MB
      if (
        files.length > 0 &&
        files
          .filter((item) => item.type.includes("image"))
          .some((file) => file.size.split(" ")[0] > 5000 && !user.isPremium)
      ) {
        return customToast("Image size limit exceeded", () => {
          console.log("test");
        });
      }
      // pdf size is limited to 5MB
      else if (
        files.length > 0 &&
        files
          .filter((item) => item.type.includes("pdf"))
          .some((file) => file.size.split(" ")[0] > 5000 && !user.isPremium)
      ) {
        return customToast("Pdf size limit exceeded", () => {
          console.log("test");
        });
      }
      // Video size is limited to 100MB
      else if (
        files.length > 0 &&
        files
          .filter((item) => item.type.includes("video"))
          .some((file) => file.size.split(" ")[0] > 100000 && !user.isPremium)
      ) {
        return customToast("Video size limit exceeded", () => {
          console.log("test");
        });
      }
      // Audio size is limited to 100MB
      else if (
        files.length > 0 &&
        files
          .filter((item) => item.type.includes("audio"))
          .some((file) => file.size.split(" ")[0] > 100000 && !user.isPremium)
      ) {
        return customToast("Audio size limit exceeded", () => {
          console.log("test");
        });
      }
      // Not supported file type
      else if (
        files.length > 0 &&
        !filesType.includes("application/pdf" || "image" || "video" || "audio")
      ) {
        return toast.error("Not supported file types");
      } else {
        const receiverId = conversation.members.find(
          (member) => member.id !== user.id
        ).id;
        const attachments = files.map((file) => ({
          url: file.base64,
          name: file.name,
          type: file.type,
        }));
        if (chatConversations.includes(conversation)) {
          setIsMsgSending(true);
          await sendMessage(
            text.trim(),
            attachments,
            receiverId,
            user.id,
            conversation.id
          );
          setIsMsgSending(false);
        } else {
          setIsMsgSending(true);
          await createConversation(user.id, receiverId, text, attachments);
          await chatConversationsRefetch();
          setIsMsgSending(false);
        }
      }
      setText("");
      setFiles([]);
      scrollToBottom();
    } catch (error) {
      setIsMsgSending(false);
      console.log(error);
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

      <div className="flex flex-col h-full w-full bg-slate-200 py-4 overflow-y-auto">
        {isLoading ? (
          <MessagesLoader />
        ) : !isLoading && messages.length === 0 ? (
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
                <p className="flex items-center justify-center tracking-wider">Load more</p>
            {!isLoading &&
              messages.map((message, index) => (
                <MessageTile
                  key={index}
                  message={message}
                  conversationId={conversation.id}
                />
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
      <div ref={scrollRef} />
      {/* Typing Input */}
      <MessageInput
        text={text}
        setText={setText}
        sendMessage={handleSendMessage}
        files={files}
        setFiles={setFiles}
        isMsgSending={isMsgSending}
      />
    </div>
  );
};

export default ConversationDetails;
