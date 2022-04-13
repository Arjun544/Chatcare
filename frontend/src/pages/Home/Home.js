import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth_services";
import { setAuth } from "../../redux/reducers/authSlice";

import styles from "./Home.module.css";
import Conversations from "./Conversations";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    dispatch(setAuth({ user: null, isAuth: false }));
  };

  return (
    <div className={styles.mainWrapper}>
      {/* Conversations */}
      <Conversations/>
    </div>
  );
};

export default Home;
