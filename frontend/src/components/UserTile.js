import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiChatSmile3Fill } from "react-icons/ri";
import { MdDelete, MdDone, MdPersonAddAlt1 } from "react-icons/md";
import Tooltip from "@nextui-org/react/tooltip";
import { Modal } from "@nextui-org/react";
import { useSelector } from "react-redux";
import profileHolder from "../assets/profile_placeholder.png";
import {
  cancelFriendRequest,
  confirmFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../services/user_services";
import { AppContext } from "../pages/Main";
import { RotateSpinner } from "react-spinners-kit";
import { createConversation } from "../services/conversation_services";

const UserTile = ({
  user,
  requests,
  refetchRequests,
  usersRefetch,
  friendsRefetch,
  isFriend,
  isRequest = false,
}) => {
  const { setCurrentConversation } = useContext(AppContext);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isStartConversation, setIsStartConversation] = useState(false);
  const [newMessage, setNewMessage] = useState("");
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

  const handleCancelRequest = async (e) => {
    e.preventDefault();
    await toast.promise(cancelFriendRequest(currentUser.id, user.id), {
      loading: "Cancelling...",
      success: <span>Friend request cancelled!</span>,
      error: <span>Could not cancel.</span>,
    });
    setAddedFriend(false);
    refetchRequests();
  };

  const handleStartConversation = (e) => {
    e.preventDefault();
    // setIsStartConversation(true);
    console.log(user.conversa);
    setCurrentConversation({
      id: 1,
      byId: currentUser,
      toId: user,
      createdAt: "2022-04-20T05:05:07.267Z",
      updatedAt: "2022-04-20T05:05:07.291Z",
      to: user,
      messages: [],
    });
    navigate("/");
  };

  const handleCreateConversation = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await createConversation(
        currentUser.id,
        user.id,
        newMessage
      );

      setIsLoading(false);
      setIsStartConversation(false);
      if (data.success === true) {
        toast.success("Message sent");
      } else {
        toast.error("Could not send message");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-fit w-44 bg-slate-100 rounded-2xl gap-2 overflow-hidden cursor-pointer hover:scale-95 transition-all duration-500 ease-in-out">
      <img
        onClick={(e) => console.log(user)}
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
                onClick={(e) => handleCancelRequest(e)}
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
                onClick={(e) => handleStartConversation(e)}
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
                onClick={(e) => handleStartConversation(e)}
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
                  onClick={(e) => handleCancelRequest(e)}
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
      {isStartConversation && (
        <Modal
          width="40%"
          closeButton
          blur
          aria-labelledby="modal-title"
          open={isStartConversation}
          onClose={(e) => setIsStartConversation(false)}
        >
          <h1 className="text-black tracking-wider font-semibold">
            Send message to {user.username}
          </h1>
          <form
            action="submit"
            onSubmit={(e) => handleCreateConversation(e)}
            className="flex flex-col flex-grow w-3/4 items-center gap-7 m-auto px-4 h-60 my-8"
          >
            <input
              value={newMessage}
              type="text"
              required
              autoComplete="off"
              placeholder="Type a message..."
              className="bg-slate-200 w-full h-14 rounded-xl mt-10 pl-4 placeholder:tracking-wider placeholder:font-normal"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {isLoading ? (
              <RotateSpinner
                sty
                size={30}
                color="#44C7F4"
                loading={isLoading}
              />
            ) : (
              <button
                type="submit"
                className="bg-customOrange w-44 m-auto shadow-md h-12 rounded-xl mt-16 text-white tracking-wider font-semibold hover:scale-95 transition-all duration-700 ease-in-out"
              >
                Send
              </button>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserTile;
