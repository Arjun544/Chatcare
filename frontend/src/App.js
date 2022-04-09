import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import WidgetLoader from "./components/WidgetLoader";
import Main from "./pages/Main";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { GuestRoute } from "./protected_routes";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Verification = lazy(() => import("./pages/Verification/Verification"));

function App() {
  const socketUrl = "http://localhost:5000";
  let socket = useRef(null);

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
  }, []);

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "0.8rem",
          },
        }}
      />
      <Routes>
        {/* <Route
          path="/register"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/verification"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <Verification />
            </Suspense>
          }
        /> */}
        <GuestRoute path="/register">
          <Suspense fallback={<WidgetLoader />}>
            <Register />
          </Suspense>
        </GuestRoute>
        <GuestRoute path="/login">
          <Suspense fallback={<WidgetLoader />}>
            <Login />
          </Suspense>
        </GuestRoute>
        <GuestRoute path="/verification">
          <Suspense fallback={<WidgetLoader />}>
            <Verification />
          </Suspense>
        </GuestRoute>
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
