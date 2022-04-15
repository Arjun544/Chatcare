import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth_services";
import { setAuth } from "../../redux/reducers/authSlice";
import Conversations from "./components/Conversations";
import StoryTile from "./components/StoryTile";
import ConversationDetails from "./components/ConversationDetails";
import ConversationAttachments from "./components/ConversationAttachments";

const stories = [
  {
    name: "Sara",
  },
  {
    name: "Sam",
  },
  {
    name: "Arjun",
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    messages: [
      {
        id: 1,
        text: "Hello",
        isMine: true,
      },
      {
        id: 2,
        text: "How are you?",
        isMine: false,
      },
      {
        id: 3,
        text: "I'm fine",
        isMine: true,
      },
      {
        id: 4,
        text: "Nice to meet you",
        isMine: false,
      },
      {
        id: 5,
        text: "How are you?",
        isMine: true,
      },
      {
        id: 6,
        text: "I'm fine",
        isMine: false,
      },
      {
        id: 7,
        text: "Nice to meet you",
        isMine: true,
      },
      {
        id: 7,
        text: "See you soon!",
        isMine: true,
      },
      {
        id: 3,
        text: "I'm fine",
        isMine: true,
      },
      {
        id: 4,
        text: "Nice to meet you",
        isMine: false,
      },
      {
        id: 5,
        text: "How are you?",
        isMine: true,
      },
      {
        id: 6,
        text: "I'm fine",
        isMine: false,
      },
      {
        id: 7,
        text: "Nice to meet you",
        isMine: true,
      },
      {
        id: 7,
        text: "See you soon!",
        isMine: true,
      },
      {
        id: 3,
        text: "I'm fine",
        isMine: true,
      },
      {
        id: 4,
        text: "Nice to meet you",
        isMine: false,
      },
      {
        id: 5,
        text: "How are you?",
        isMine: true,
      },
      {
        id: 6,
        text: "I'm fine",
        isMine: false,
      },
      {
        id: 7,
        text: "Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you Nice to meet you ",
        isMine: true,
      },
      {
        id: 7,
        text: "See you soon!",
        isMine: true,
      },
    ],
    time: "12:00",
    isRead: false,
  },
  {
    id: 2,
    name: "Arjun",
    messages: [],
    time: "03:00",
    isRead: true,
  },
];

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState(data);
  const [isStoriesOpened, setIsStoriesOpened] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(0);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    dispatch(setAuth({ user: null, isAuth: false }));
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex h-full">
        {/* Conversations */}
        <Conversations
          stories={stories}
          conversations={conversations}
          setCurrentConversation={setCurrentConversation}
          isStoriesOpened={isStoriesOpened}
          setIsStoriesOpened={setIsStoriesOpened}
        />
        <div className="flex flex-col flex-grow">
          {/* Stories */}
          {isStoriesOpened && stories.length > 1 && (
            <div className="flex h-20 items-center px-6 transition-all duration-700 ease-in-out">
              {stories.map((story, index) => (
                <StoryTile key={index} story={story} />
              ))}
            </div>
          )}
          {/* Conversation Details */}
          <ConversationDetails
            conversation={conversations[currentConversation]}
            setConversations={setConversations}
          />
        </div>
        <ConversationAttachments />
      </div>
    </div>
  );
};

export default Home;
