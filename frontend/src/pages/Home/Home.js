import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth_services";
import { setAuth } from "../../redux/reducers/authSlice";
import Conversations from "./components/Conversations";
import Lottie from "lottie-react";
import newMessage from "../../assets/new-message.json";
import ConversationDetails from "./components/ConversationDetails";
import ConversationAttachments from "./components/ConversationAttachments";
import { getConversations } from "../../services/conversation_services";
import { useQuery } from "react-query";
import { AppContext } from "../Main";

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
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
  {
    name: "Arjun",
  },
];

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentConversation, setCurrentConversation } =
    useContext(AppContext);
  const [isStoriesOpened, setIsStoriesOpened] = useState(false);
  const dispatch = useDispatch();

  const {
    isLoading: isConversationsLoading,
    data: conversations,
    refetch: conversationsRefetch,
    isError: isConversationsError,
  } = useQuery(
    ["conversations"],
    async () => {
      const response = await getConversations(user.id);
      return response.data.conversations;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

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
          isConversationsLoading={isConversationsLoading}
          stories={stories}
          conversations={conversations}
          setCurrentConversation={setCurrentConversation}
          isStoriesOpened={isStoriesOpened}
          setIsStoriesOpened={setIsStoriesOpened}
        />

        <div className="flex flex-col flex-grow">
          {/* Stories */}
          {/* {isStoriesOpened && stories.length > 1 && (
            <div className="flex h-20 items-center px-6 transition-all duration-700 ease-in-out">
              {stories.map((story, index) => (
                <StoryTile key={index} story={story} />
              ))}
            </div>
          )} */}
          {/* Conversation Details */}

          <ConversationDetails conversation={currentConversation} />
        </div>
        <ConversationAttachments conversation={currentConversation} />
      </div>
    </div>
  );
};

export default Home;
