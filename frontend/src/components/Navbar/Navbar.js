import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo.js";
import { navItems } from "../../helpers/constant";
import Tooltip from "@nextui-org/react/tooltip";

import styles from "./Navbar.module.css";
import { RiShieldStarFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.logoWrapper}>
        <Logo height="40" width="40" />
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {navItems.map((item, index) => (
          <Tooltip
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "0px 10px",
            }}
            content={item.name}
            color="invert"
            placement="right"
          >
            <div key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.activeStyle : styles.isNotActiveStyle
                }
              >
                {item.icon}
              </NavLink>
            </div>
          </Tooltip>
        ))}
      </div>
      <div className={styles.premiumWrapper}>
        <Tooltip content="premium" color="invert" placement="rightStart">
          <RiShieldStarFill fontSize={30} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
