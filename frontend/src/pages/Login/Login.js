import React, { useState } from "react";
import LeftContainer from "./components/LeftContainer";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Checkbox from "@nextui-org/react/checkbox";
import { gmailLogin, login } from "../../services/auth_services";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";
import { RotateSpinner } from "react-spinners-kit";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGmailLoading, setIsGmailLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await login(email, password);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
        return;
      } else {
        dispatch(setAuth({ isAuth: true, user: data.user }));
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Container */}
      <LeftContainer />

      {/* Right Container */}
      <div className="flex flex-col bg-white w-full md:w-2/3 items-center justify-evenly">
        <div className="flex flex-col w-full md:w-1/3 px-16 md:px-0">
          <h1 className="font-semibold tracking-wider text-xl">Login now</h1>
          <h2 className="font-semibold tracking-wider text-slate-400">
            See your friends and stay connected!
          </h2>
        </div>
        <form
          action="submit"
          onSubmit={(e) => handleLogin(e)}
          className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-4 items-center px-16 md:px-0"
        >
          <input
            value={email}
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your email"
            className="bg-slate-200 w-full h-16 rounded-xl pl-4 placeholder:tracking-wider placeholder:font-normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-4 w-full ">
            <input
              value={password}
              type={showPass ? "text" : "password"}
              autoComplete="off"
              required
              minLength={8}
              placeholder="Enter your password"
              className="bg-slate-200 w-full h-16 rounded-xl pl-4 placeholder:tracking-wider placeholder:font-normal"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  value={showPass}
                  checked={showPass}
                  type="checkbox"
                  onChange={(e) => setShowPass(!showPass)}
                />
                <h4 className="text-slate-400 tracking-wider text-xs font-medium">
                  Show Password{" "}
                </h4>
              </div>
              <h4
                className="text-slate-400 tracking-wider text-xs font-medium cursor-pointer hover:text-sky-400"
                onClick={(e) => navigate("/forgetPassword")}
              >
                Forget Password?
              </h4>
            </div>
          </div>
          {isLoading ? (
            <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
          ) : (
            <button
              type="submit"
              className="bg-customOrange w-2/3 m-auto shadow-md h-14 rounded-xl mt-16 text-white tracking-wider font-semibold hover:scale-95 transition-all duration-700 ease-in-out"
            >
              Login
            </button>
          )}
        </form>
        {isGmailLoading ? (
          <RotateSpinner
            sty
            size={30}
            color="#44C7F4"
            loading={isGmailLoading}
          />
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GMAIL_CLIENT_ID}
            buttonText="Continue with Google"
            render={(renderProps) => (
              <button
                className="md:w-1/4 w-2/3"
                onClick={renderProps.onClick}
                disabled={false}
              >
                <div className="bg-sky-200 w-full items-center rounded-xl flex h-14 gap-4 justify-center hover:scale-95 transition-all duration-700 ease-in-out">
                  <FcGoogle fontSize={25} />
                  <span className="text-sm font-semibold tracking-wider text-sky-500">
                    Login with Google
                  </span>
                </div>
              </button>
            )}
            onSuccess={async (response) => {
              try {
                setIsGmailLoading(true);
                const { data } = await gmailLogin(response.profileObj.email);
                setIsGmailLoading(false);
                if (data.success === false) {
                  return toast.error(data.message);
                }
                // Add user to redux
                if (data.success === true) {
                  dispatch(
                    setAuth({
                      isAuth: data.isAuth,
                      user: data.user,
                    })
                  );
                  toast.success("Login Successfully");
                  navigate("/");
                }
              } catch (error) {
                setIsGmailLoading(false);
                console.log(error);
                return toast.error(error.message);
              }
            }}
            onFailure={(response) => toast.error("Something went wrong")}
            cookiePolicy={"single_host_origin"}
          />
        )}
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-black tracking-wider text-sm">
            Not registered yet?
          </span>
          <span
            onClick={(e) => navigate("/register")}
            className="text-green-400 tracking-wider cursor-pointer text-sm"
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
