import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Main";
import Moment from "react-moment";
import Collapse from "@nextui-org/react/collapse";
import { RiSearch2Fill } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdDone, MdDoneAll } from "react-icons/md";
import profileHolder from "../../../assets/profile_placeholder.png";
import ConversationLoader from "../../../loaders/ConversationLoader";
import { useSelector } from "react-redux";

const Conversations = ({
  stories,
  setCurrentConversation,
  isStoriesOpened,
  setIsStoriesOpened,
  
}) => {
  const { socket, isChatConversationsLoading, chatConversations } =
    useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const [activeFriends, setActiveFriends] = useState([]);
  const [isShowingOnline, setIsShowingOnline] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    socket.current.on("activeUsers", (activeUsers) => {
      const filteredUsers = activeUsers.filter(
        (newUser) => newUser.id !== user.id
      );
      setActiveFriends(filteredUsers);
    });
  }, [user.id, socket]);

  return (
    <div className="flex flex-col w-1/5 h-full bg-white shadow-sm">
      {/* Stories */}
      <div className="flex flex-row h-20 w-full items-center justify-between bg-white px-3">
        <h5 className="font-semibold tracking-wider text-black">
          Stories ({stories.length})
        </h5>
        {stories.length > 1 && (
          <TiArrowSortedDown
            onClick={(e) => setIsStoriesOpened(!isStoriesOpened)}
            fontSize={25}
            className="-rotate-90 cursor-pointer"
          />
        )}
      </div>
      {/* Active Friends */}
      <div
        className={`flex flex-col w-full items-start bg-white transition-all duration-500 ease-in-out ${
          activeFriends.length > 0
            ? isShowingOnline
              ? "h-52"
              : "h-32"
            : "h-12"
        }`}
      >
        <div className="flex flex-row w-full items-center justify-between bg-white px-3">
          <h5 className="font-semibold tracking-wider text-black">
            Online ({activeFriends.length})
          </h5>
          {activeFriends.length > 0 && (
            <TiArrowSortedDown
              onClick={(e) => setIsShowingOnline(!isShowingOnline)}
              fontSize={25}
              className={`cursor-pointer transition-all duration-700 ease-in-out ${
                isShowingOnline ? "-rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
        {activeFriends.length > 0 && (
          <div
            className={`grid grid-cols-5 gap-4 my-4 transition-all duration-700 ease-in-out px-3 ${
              isShowingOnline ? "overflow-y-scroll" : "overflow-hidden"
            }`}
          >
            {activeFriends.map((friend, index) => (
              <div key={index} className="flex relative">
                {friend.user.profile === "" ? (
                  <img
                    src={profileHolder}
                    alt="user profile"
                    className="object-contain h-14 py-2 px-4  bg-gray-200 rounded-full"
                  />
                ) : (
                  <img
                    src={friend.user.profile}
                    alt="user profile"
                    className="object-cover h-14 bg-gray-200 rounded-full"
                  />
                )}
                <div className="absolute flex bottom-0 right-2 h-3 w-3 rounded-full bg-green-400"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Conversations */}
      <div className="flex flex-col flex-grow">
        <div
          className={`flex flex-col transition-all duration-700 ease-in-out ${
            !isSearchOpen ? "h-0" : "h-auto"
          } `}
        >
          <div className="flex items-center justify-between px-3">
            <h1 className="font-semibold tracking-wider text-black">
              Conversations
            </h1>
            <RiSearch2Fill
              onClick={(e) => setIsSearchOpen(!isSearchOpen)}
              fontSize={22}
              className="fill-slate-300 hover:fill-slate-500 cursor-pointer"
            />
          </div>
          {/* Search Bar */}
          {isSearchOpen && (
            <div className="px-3 mt-3">
              <input
                placeholder="Search conversations..."
                className="w-full h-12 bg-slate-300 rounded-xl pl-4 placeholder:tracking-wider placeholder:text-sm placeholder:text-white"
              />
            </div>
          )}
          {/* Messages */}

          <Collapse.Group divider={false}>
            <Collapse
              title={
                <h1 className="text-slate-400 tracking-wider text-sm">
                  Recent Chats
                </h1>
              }
              expanded={true}
              showArrow={false}
            >
              {isChatConversationsLoading ? (
                <ConversationLoader />
              ) : !chatConversations || chatConversations.length === 0 ? (
                <p className="text-slate-400 text-center tracking-wider font-semibold">
                  No chats yet
                </p>
              ) : (
                chatConversations.map((conversation, index) => (
                  <div
                    key={index}
                    onClick={(e) => setCurrentConversation(conversation)}
                    className="flex w-full h-20 items-center justify-between cursor-pointer px-4 hover:bg-gray-200 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          conversation.members.find(
                            (member) => member.id !== user.id
                          ).profile === ""
                            ? profileHolder
                            : conversation.members.find(
                                (member) => member.id !== user.id
                              ).profile
                        }
                        alt="user profile"
                        className="h-10 w-10 object-contain rounded-full bg-white"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-sm text-black tracking-wider">
                          {
                            conversation.members.find(
                              (member) => member.id !== user.id
                            ).username
                          }
                        </h1>
                        <div className="flex items-center gap-2">
                          {conversation.isRead ? <MdDoneAll /> : <MdDone />}
                          <p className="text-black tracking-wider text-sm w-32 line-clamp-1 text-ellipsis">
                            {conversation.messages[
                              conversation.messages.length - 1
                            ].text === ""
                              ? conversation.messages[
                                  conversation.messages.length - 1
                                ].senderId === user.id
                                ? "you sent an attachment"
                                : `${
                                    conversation.members.find(
                                      (member) => member.id !== user.id
                                    ).username
                                  } sent an attachment`
                              : conversation.messages[
                                  conversation.messages.length - 1
                                ].text}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <h1 className="text-slate-300 text-xs tracking-wider font-semibold">
                        <Moment fromNow>
                          {
                            conversation.messages[
                              conversation.messages.length - 1
                            ].createdAt
                          }
                        </Moment>
                      </h1>
                      <h1 className="text-xs tracking-wider font-semibold bg-green-400 text-black py-1 px-2 rounded-full">
                        2
                      </h1>
                    </div>
                  </div>
                ))
              )}
            </Collapse>
            <Collapse
              title={
                <h1 className="text-slate-400 tracking-wider text-sm">
                  Group Chats
                </h1>
              }
              showArrow={false}
            >
              <span>test</span>
            </Collapse>
          </Collapse.Group>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
