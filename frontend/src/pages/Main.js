import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import WidgetLoader from "../components/WidgetLoader";
// import NotFound from "./NotFound";

const Home = lazy(() => import("./Home/Home"));

const Main = () => {
  //   useDarkMode();

  return (
    <div className="flex h-full w-full ">
      {/* <SideBar isSideBarExpanded={isSideBarExpanded} /> */}
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
