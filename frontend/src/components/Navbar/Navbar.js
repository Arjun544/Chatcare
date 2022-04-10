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
        <Logo height="45" width="45" />
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {navItems.map((item, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.isNotActiveStyle
              }
            >
              <Tooltip
                content={item.name}
                color="invert"
                placement="right"
              >

              {item.icon}
              </Tooltip>
            </NavLink>
          </div>
        ))}
      </div>
      <div className={styles.premiumWrapper}>
        <RiShieldStarFill fontSize={30} />
      </div>
    </div>
  );
};

export default Navbar;
