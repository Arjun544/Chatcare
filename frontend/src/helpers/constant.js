import { RiChatSmile3Fill, RiSearch2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { SiWechat } from "react-icons/si";

export const navItems = [
  {
    name: "Chats",
    path: "/",
    icon: <RiChatSmile3Fill fontSize={25} />,
  },
  {
    name: "Search",
    path: "/search",
    icon: <RiSearch2Fill fontSize={25} />,
  },
  {
    name: "Groups",
    path: "/groups",
    icon: <SiWechat fontSize={27} />,
  },
  {
    name: "Friends",
    path: "/friends",
    icon: <FaUserFriends fontSize={25} />,
  },
  {
    name: "Your Profile",
    path: "/profile",
    icon: (
      <div
        style={{
          width: "35px",
          height: "35px",
          background: "#e2e2e2",
          borderRadius: "50%",
        }}
      ></div>
    ),
  },
];
