import { RiChatSmile3Fill } from 'react-icons/ri';
import { FaUserFriends } from "react-icons/fa";

export const navItems = [
  {
    name: "Chats",
    path: "/chat",
    icon: <RiChatSmile3Fill fontSize={25} />,
  },
  {
    name: "Groups",
    path: "/groups",
    icon: <FaUserFriends fontSize={25}/>,
  },
];
