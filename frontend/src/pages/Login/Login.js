import React, { useState } from "react";
import LeftContainer from "./components/LeftContainer";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
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
    <div className={styles.mainWrapper}>
      {/* Left Container */}
      <LeftContainer />

      {/* RIght Container */}
      <div className={styles.rightContainer}>
        <div className={styles.loginWrapper}>
          <h1>Login now</h1>
          <h2>See your friends and stay connected!</h2>
        </div>
        <form action="submit" onSubmit={(e) => handleLogin(e)}>
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
            <div className={styles.showPassMainWrapper}>
              <div className={styles.showPassWrapper}>
                <input
                  value={showPass}
                  checked={showPass}
                  type="checkbox"
                  onChange={(e) => setShowPass(!showPass)}
                />
                <h4>Show Password </h4>
              </div>
              <h4 onClick={(e) => navigate("/forgetPassword")}>
                Forget Password?
              </h4>
            </div>
          </div>
          {isLoading ? (
            <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
          ) : (
            <button type="submit" className={styles.loginBtn}>
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
                className={styles.googleBtnWrapper}
                onClick={renderProps.onClick}
                disabled={false}
              >
                <div className={styles.gmailBtn}>
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
        <div className={styles.createAccountWrapper}>
          <span>Not registered yet?</span>
          <span
            onClick={(e) => navigate("/register")}
            className={styles.creatAccountSpan}
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
