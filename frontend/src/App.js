import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import WidgetLoader from "./components/WidgetLoader";
import Main from "./pages/Main";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { RequireAuth } from "./helpers/RequireAuth";
import { useRefreshHook } from "./helpers/useRefreshHook";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  // call refresh endpoint
  const { loading } = useRefreshHook();

  if (loading) {
    return <WidgetLoader />;
  }

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
        <Route
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
        />
        <Route
          path="/forgetPassword"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
          path="/resetPassword"
          element={
            <Suspense fallback={<WidgetLoader />}>
              <ResetPassword />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
