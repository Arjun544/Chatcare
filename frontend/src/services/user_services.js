import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getAllUsers = async (email) =>
  await api.get(`/user/users/${email}`);

export const sendFriendRequest = async (userId, friendId) =>
  await api.post("/user/sendFriendRequest", { userId, friendId });

  export const cancelFriendRequest = async (userId, friendId) =>
    await api.post("/user/cancelFriendRequest", { userId, friendId });