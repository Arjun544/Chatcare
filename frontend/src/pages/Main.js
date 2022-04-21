import { createContext, lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import WidgetLoader from "../components/WidgetLoader";
// import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));
const Friends = lazy(() => import("./Friends/Friends"));
const Requests = lazy(() => import("./Requests"));

export const AppContext = createContext();

const Main = () => {
  const [currentConversation, setCurrentConversation] = useState(null);
  //   useDarkMode();

  return (
    <AppContext.Provider
      value={{ currentConversation, setCurrentConversation }}
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
