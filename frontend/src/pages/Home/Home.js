import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth_services";
import { setAuth } from "../../redux/reducers/authSlice";

import styles from "./Home.module.css";

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
      <div className="flex"></div>
    </div>
  );
};

export default Home;
