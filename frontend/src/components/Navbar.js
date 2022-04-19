import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo.js";
import { navItems } from "../helpers/constant";
import Tooltip from "@nextui-org/react/tooltip";
import { RiShieldStarFill } from "react-icons/ri";

const activeStyle =
  "flex w-4/5 items-center justify-center py-2 rounded-2xl bg-customSky transition-all duration-700 ease-in-out";

const isNotActiveStyle =
  "flex w-4/5 items-center justify-center py-3 rounded-2xl text-slate-400 hover:text-customSky transition-all duration-700 ease-in-out";

const Navbar = () => {
  return (
    <div className="flex flex-col h-screen w-20 bg-slate-200 items-center justify-between py-5">
      <div className="cursor-pointer hover:animate-spin">
        <Logo height="40" width="40" />
      </div>
      <div className="w-20 flex flex-col items-center justify-center">
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
            <div key={index} className="w-20 flex items-center justify-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : isNotActiveStyle
                }
              >
                {item.icon}
              </NavLink>
            </div>
          </Tooltip>
        ))}
      </div>
      <Tooltip content="Premium" color="invert" placement="rightStart">
        <RiShieldStarFill fontSize={30} className="fill-customOrange" />
      </Tooltip>
    </div>
  );
};

export default Navbar;
