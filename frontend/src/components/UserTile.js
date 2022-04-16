import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import profileHolder from "../assets/profile_placeholder.png";
import {
  cancelFriendRequest,
  sendFriendRequest,
} from "../services/user_services";

const UserTile = ({ user }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [addedFriend, setAddedFriend] = useState(
    currentUser.friends.map((item) => item.email).includes(user.email)
  );

  const handleAddFriend = async (e) => {
    e.preventDefault();
    await toast.promise(sendFriendRequest(currentUser.id, user.id), {
      loading: "Sending...",
      success: <b>Friend request sent!</b>,
      error: <b>Could not sent.</b>,
    });
    // await sendFriendRequest(currentUser.id, user.id);
    setAddedFriend(true);
  };
  const handleCancelFriend = async (e) => {
    e.preventDefault();
    await toast.promise(cancelFriendRequest(currentUser.id, user.id), {
      loading: "Cancelling...",
      success: <b>Friend request cancelled!</b>,
      error: <b>Could not cancel.</b>,
    });
    setAddedFriend(false);
  };

  return (
    <div className="flex flex-col h-fit w-fit bg-slate-100 rounded-xl px-4 py-4 gap-3 cursor-pointer hover:scale-95 transition-all duration-500 ease-in-out">
      <img
        src={user.profile === "" ? profileHolder : user.profile}
        alt="user profile"
        className="object-contain h-32 w-32"
      />
      <h1 className="text-black font-semibold tracking-wider text-sm capitalize">
        {user.username}
      </h1>
      {addedFriend ? (
        <button
          onClick={(e) => handleCancelFriend(e)}
          className="w-full bg-red-300 rounded-xl py-2 font-semibold tracking-wider text-sm hover:bg-red-400"
        >
          Cancel request
        </button>
      ) : (
        <button
          onClick={(e) => handleAddFriend(e)}
          className="w-full bg-green-300 rounded-xl py-2 font-semibold tracking-wider text-sm hover:bg-green-400"
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default UserTile;
