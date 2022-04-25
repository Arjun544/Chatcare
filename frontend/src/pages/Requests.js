import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUserRequests } from "../services/user_services";
import UserTile from "../components/UserTile";

const Requests = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    isLoading: isRequestsLoading,
    data: requests,
    refetch: refetchRequests,
    isError: isRequestsError,
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

  return (
    <div className="w-screen h-screen flex flex-col bg-white px-10 py-6">
      {/* Friends Requests */}
      <div className="flex flex-col w-full h-fit">
        <h1 className="text-black tracking-wider font-semibold">
          Friends Requests
        </h1>
        {isRequestsLoading && <div>Loading...</div>}
        {isRequestsError && (
          <div className="w-full h-full flex items-center justify-center">
            Something went wrong...
          </div>
        )}
        {requests && requests.length === 0 ? (
          <span className="font-semibold tracking-wider text-slate-400 flex w-full items-center justify-center my-10">
            No friend requests
          </span>
        ) : (
          <div className="grid grid-cols-9 gap-6 bg-white w-full h-fit my-4">
            {requests &&
              requests.map((item) => (
                <UserTile
                  key={item.id}
                  user={item}
                  isFriend={true}
                  isRequest={true}
                  refetchRequests={refetchRequests}
                />
              ))}
          </div>
        )}
      </div>
      {/* Message Requests */}
      {/* <div className="flex flex-col w-full h-fit mt-4">
        <h1 className="text-black tracking-wider font-semibold">
          Message Requests
        </h1>
        {isLoading && <div>Loading...</div>}
        {isError && (
          <div className="w-full h-full flex items-center justify-center">
            Something went wrong...
          </div>
        )}
        <div className="grid grid-cols-2 gap-6 bg-white w-full h-fit my-4">
          {users &&
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between w-full h-20 bg-slate-200 rounded-2xl px-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profile === "" ? profileHolder : user.profile}
                    alt="user profile"
                    className="object-cover rounded-full h-full w-16"
                  />
                  <p>this is a test message</p>
                </div>
                <div className="flex items-center gap-4">
                  <Tooltip content="Confirm" color="invert" placement="top">
                    <button
                      //   onClick={(e) => handleAddFriend(e)}
                      className="bg-green-300 rounded-xl p-2 font-semibold tracking-wider text-sm hover:bg-green-400"
                    >
                      <MdDone fontSize={20} />
                    </button>
                  </Tooltip>

                  <Tooltip content="Remove" color="invert" placement="top">
                    <button
                      //   onClick={(e) => handleAddFriend(e)}
                      className="bg-red-300 rounded-xl p-2 font-semibold tracking-wider text-sm hover:bg-red-400"
                    >
                      <MdDelete fontSize={20} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default Requests;
