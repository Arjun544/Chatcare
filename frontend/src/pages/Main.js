import {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { getConversations } from "../services/conversation_services";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import WidgetLoader from "../components/WidgetLoader";
import { useSelector } from "react-redux";
// import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));
const Friends = lazy(() => import("./Friends/Friends"));
const Requests = lazy(() => import("./Requests"));

export const AppContext = createContext();

const Main = () => {
  const { user } = useSelector((state) => state.auth);
  const socketUrl = "http://localhost:5000";
  let socket = useRef(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  //   useDarkMode();

  useEffect(() => {
    socket.current = io(socketUrl, {
      transports: ["polling"],
    });
    socket.current.on("connection", () => {
      console.log("connected to server");
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnecting");
    });

    socket.current.emit("addUser", user);
  }, []);

  const {
    isLoading: isChatConversationsLoading,
    data: chatConversations,
    refetch: chatConversationsRefetch,
    isError: isConversationsError,
  } = useQuery(
    ["conversations"],
    async () => {
      const response = await getConversations(user.id);
      console.log(response.data.conversations);
      return response.data.conversations;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <AppContext.Provider
      value={{
        socket,
        isChatConversationsLoading,
        chatConversations,
        chatConversationsRefetch,
        currentConversation,
        setCurrentConversation,
      }}
    >
      <div className="flex">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<WidgetLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/friends"
            element={
              <Suspense fallback={<WidgetLoader />}>
                <Friends />
              </Suspense>
            }
          />
          <Route
            path="/requests"
            element={
              <Suspense fallback={<WidgetLoader />}>
                <Requests
                  currentConversation={currentConversation}
                  setCurrentConversation={setCurrentConversation}
                />
              </Suspense>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default Main;
