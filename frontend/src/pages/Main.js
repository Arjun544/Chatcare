import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import WidgetLoader from "../components/WidgetLoader";
// import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));

const Main = () => {
  //   useDarkMode();

  return (
    <div style={{
      display: "flex",
    }}>
      <Navbar  />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <Home />
            </Suspense>
          }
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default Main;
