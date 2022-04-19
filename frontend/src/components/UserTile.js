import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiChatSmile3Fill } from "react-icons/ri";
import { MdDelete, MdDone, MdPersonAddAlt1 } from "react-icons/md";
import Tooltip from "@nextui-org/react/tooltip";
import { useSelector } from "react-redux";
import profileHolder from "../assets/profile_placeholder.png";
import {
  cancelFriendRequest,
  confirmFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../services/user_services";

const UserTile = ({
  user,
  requests,
  refetchRequests,
  usersRefetch,
  friendsRefetch,
  isFriend,
  isRequest = false,
}) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [addedFriend, setAddedFriend] = useState(
    requests === undefined
      ? false
      : requests?.map((item) => item.email).includes(user.email)
  );

  const handleAddFriend = async (e) => {
    e.preventDefault();
    await toast.promise(sendFriendRequest(currentUser.id, user.id), {
      loading: "Sending...",
      success: <span>Friend request sent!</span>,
      error: <span>Could not sent.</span>,
    });
    setAddedFriend(true);
  };

  const handleConfirmRequest = async (e) => {
    e.preventDefault();
    await toast.promise(confirmFriendRequest(currentUser.id, user.id), {
      loading: "Confirming...",
      success: <span>Added friend</span>,
      error: <span>Could not add friend.</span>,
    });
    refetchRequests();
  };

  const handleRemoveFriend = async (e) => {
    e.preventDefault();
    await toast.promise(removeFriend(currentUser.id, user.id), {
      loading: "Removing...",
      success: <span>Remove friend</span>,
      error: <span>Could not remove friend.</span>,
    });
    friendsRefetch();
    usersRefetch();
  };

  const handleCancelFriend = async (e) => {
    e.preventDefault();
    await toast.promise(cancelFriendRequest(currentUser.id, user.id), {
      loading: "Cancelling...",
      success: <span>Friend request cancelled!</span>,
      error: <span>Could not cancel.</span>,
    });
    setAddedFriend(false);
  };

  return (
    <div className="flex flex-col h-fit w-44 bg-slate-100 rounded-2xl gap-2 overflow-hidden cursor-pointer hover:scale-95 transition-all duration-500 ease-in-out">
      <img
        src={user.profile === "" ? profileHolder : user.profile}
        alt="user profile"
        className="object-cover h-40 w-full"
      />
      <div className="flex flex-col px-4 gap-2">
        <h1 className="text-black font-semibold tracking-wider text-sm capitalize">
          {user.username}
        </h1>
        {isRequest ? (
          <div className="w-full flex items-center justify-center gap-4">
            <Tooltip content="Confirm" color="invert" placement="rightStart">
              <button
                onClick={(e) => handleConfirmRequest(e)}
                className="bg-green-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-green-400"
              >
                <MdDone fontSize={20} />
              </button>
            </Tooltip>

            <Tooltip content="Remove" color="invert" placement="rightStart">
              <button
                onClick={(e) => handleAddFriend(e)}
                className="bg-red-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-red-400"
              >
                <MdDelete fontSize={20} />
              </button>
            </Tooltip>
          </div>
        ) : isFriend ? (
          <div className="w-full flex items-center justify-center gap-4">
            <Tooltip content="Start chat" color="invert" placement="rightStart">
              <button
                onClick={(e) => handleAddFriend(e)}
                className="bg-green-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-green-400"
              >
                <RiChatSmile3Fill fontSize={20} />
              </button>
            </Tooltip>

            <Tooltip
              content="Remove friend"
              color="invert"
              placement="rightStart"
            >
              <button
                onClick={(e) => handleRemoveFriend(e)}
                className="bg-red-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-red-400"
              >
                <MdDelete fontSize={20} />
              </button>
            </Tooltip>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-4">
            <Tooltip
              content="Send Message"
              color="invert"
              placement="rightStart"
            >
              <button
                onClick={(e) => handleAddFriend(e)}
                className="bg-green-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-green-400"
              >
                <RiChatSmile3Fill fontSize={20} />
              </button>
            </Tooltip>
            {addedFriend ? (
              <Tooltip
                content="Remove friend request"
                color="invert"
                placement="rightStart"
              >
                <button
                  onClick={(e) => handleCancelFriend(e)}
                  className="bg-red-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-red-400"
                >
                  <MdDelete fontSize={20} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                content="Send friend request"
                color="invert"
                placement="rightStart"
              >
                <button
                  onClick={(e) => handleAddFriend(e)}
                  className="bg-green-300 rounded-xl p-2 mb-3 font-semibold tracking-wider text-sm hover:bg-green-400"
                >
                  <MdPersonAddAlt1 fontSize={20} />
                </button>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTile;
