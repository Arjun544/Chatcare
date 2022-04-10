import React, { useState } from "react";
import LeftContainer from "./components/LeftContainer";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RotateSpinner } from "react-spinners-kit";
import { gmailSignup, register } from "../../services/auth_services";
import Checkbox from "@nextui-org/react/checkbox";

import styles from "./Register.module.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGmailLoading, setIsGmailLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }
    const user = {
      username,
      email,
      password,
      confirmPassword,
    };
    try {
      setIsLoading(true);
      const { data } = await register(user);
      setIsLoading(false);
      if (data.success === false) {
        toast.error(data.message);
        return;
      } else {
        dispatch(setAuth({ isAuth: true, user: data.user }));
        toast.success("Register Successfully");
        navigate("/verification");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      {/* Left Container */}
      <LeftContainer />

      {/* Right Container */}
      <div className={styles.rightContainer}>
        <div className={styles.loginWrapper}>
          <h1>Register now</h1>
          <h2>See your friends and stay connected!</h2>
          <h5>Register with valid email, we'll sent verification code!</h5>
        </div>
        <form action="submit" onSubmit={(e) => handleRegister(e)}>
          <input
            value={username}
            type="text"
            required
            minLength={2}
            autoComplete="off"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={email}
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordWrapper}>
            <input
              value={password}
              type={showPass ? "text" : "password"}
              autoComplete="off"
              required
              minLength={8}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              value={confirmPassword}
              type={showPass ? "text" : "password"}
              autoComplete="off"
              required
              minLength={8}
              placeholder="Enter confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className={styles.showPassWrapper}>
              <Checkbox
                value={showPass}
                checked={showPass}
                type="checkbox"
                onChange={(e) => setShowPass(!showPass)}
              />
              <h4>Show Password </h4>
            </div>
          </div>
          {isLoading ? (
            <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
          ) : (
            <button type="submit" className={styles.loginBtn}>
              Register
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
                className={styles.googleBtnWrapper}
                onClick={renderProps.onClick}
                disabled={false}
              >
                <div className={styles.gmailBtn}>
                  <FcGoogle fontSize={25} />
                  <span className="text-sm font-semibold tracking-wider text-sky-500">
                    Register with Google
                  </span>
                </div>
              </button>
            )}
            onSuccess={async (response) => {
              try {
                setIsGmailLoading(true);
                const { data } = await gmailSignup(
                  response.profileObj.name,
                  response.profileObj.email,
                  response.profileObj.imageUrl
                );
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
                  toast.success("Register Successfully");
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
        <div className={styles.createAccountWrapper}>
          <span>Already have an account?</span>
          <span
            onClick={(e) => navigate("/login")}
            className={styles.creatAccountSpan}
          >
            Login now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
