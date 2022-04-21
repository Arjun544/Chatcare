import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import {
  getAllUsers,
  getUserFriends,
  getUserRequests,
} from "../../services/user_services";
import UserTile from "../../components/UserTile";

const Friends = () => {
  const { user } = useSelector((state) => state.auth);
  
  const {
    isLoading: friendsLoading,
    data: friends,
    refetch: friendsRefetch,
    isError: friendsError,
  } = useQuery(
    ["friends"],
    async () => {
      const response = await getUserFriends(user.email);
      return response.data.friends;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
  const {
    isLoading: requestsLoading,
    data: requests,
    isError: requestsError,
  } = useQuery(
    ["requests"],
    async () => {
      const response = await getUserRequests(user.email);
      return response.data.requests;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
  const {
    isLoading: usersLoading,
    data: users,
    refetch: usersRefetch,
    isError: usersError,
  } = useQuery(
    ["allUsers", friends],
    async () => {
      console.log(friends);
      const response = await getAllUsers(
        user.email,
        friends.map((friend) => friend.id)
      );
      return response.data.users;
    },
    {
      // The query will not execute until the friends exists
      enabled: !!friends,
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="w-screen h-screen flex flex-col bg-white px-10 py-6">
      {/* User friends */}
      <div className="flex flex-col w-full h-fit">
        <h1 className="text-black tracking-wider font-semibold">
          Your friends
        </h1>
        {friendsLoading ? (
          <div>Loading...</div>
        ) : friendsError ? (
          <div className="w-full h-full flex items-center justify-center">
            Something went wrong...
          </div>
        ) : friends.length === 0 ? (
          <span className="font-semibold tracking-wider text-slate-400 flex w-full items-center justify-center my-10">
            No friends
          </span>
        ) : (
          <div className="grid grid-cols-9 gap-6 bg-white w-full h-fit my-4">
            {friends &&
              friends.map((friend) => (
                <UserTile
                  key={friend.id}
                  user={friend}
                  isFriend={true}
                  friendsRefetch={friendsRefetch}
                  usersRefetch={usersRefetch}
                />
              ))}
          </div>
        )}
      </div>
      {/* People suggestions */}
      <div className="flex flex-col w-full h-fit mt-4">
        <h1 className="text-black tracking-wider font-semibold">
          People you might know
        </h1>
        {usersLoading && <div>Loading...</div>}
        {usersError && (
          <div className="w-full h-full flex items-center justify-center">
            Something went wrong...
          </div>
        )}
        <div className="grid grid-cols-9 gap-6 bg-white w-full h-fit my-4">
          {users &&
            users.map((user) => (
              <UserTile
                key={user.id}
                user={user}
                isFriend={false}
                requests={requests}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
