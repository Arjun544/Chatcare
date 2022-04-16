import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getAllUsers } from "../../services/user_services";
import UserTile from "../../components/UserTile";

const Discover = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    isLoading,
    data: users,
    isRefetching,
    isError,
  } = useQuery(
    ["discoverPeople"],
    async () => {
      const response = await getAllUsers(user.email);
      return response.data.users;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="w-screen h-screen flex flex-col bg-white px-10 py-6">
      {/* Dsicover friends */}
      <div className="flex flex-col w-full h-full">
        <h1 className="text-black tracking-wider font-semibold">
          People you might know
        </h1>
        {isLoading && <div>Loading...</div>}
        {isError && (
          <div className="w-full h-full flex items-center justify-center">
            Something went wrong...
          </div>
        )}
        <div className="grid grid-cols-10 gap-4 bg-white w-full h-full my-4">
          {users && users.map((user) => <UserTile key={user.id} user={user} />)}
        </div>
      </div>
      {/* Discover Groups */}
      <div className="flex flex-col w-full h-full">
        <h1 className="text-black tracking-wider font-semibold">
          Groups you might like
        </h1>
        <div className="flex flex-grow bg-red-500 w-full my-4"></div>
      </div>
    </div>
  );
};

export default Discover;
