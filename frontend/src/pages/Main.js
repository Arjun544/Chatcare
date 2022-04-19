import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import WidgetLoader from "../components/WidgetLoader";
// import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));
const Friends = lazy(() => import("./Friends/Friends"));
const Requests = lazy(() => import("./Requests"));

const Main = () => {
  //   useDarkMode();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
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
              <Requests />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default Main;
