import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const getAllUsers = async (email, friendsIds) =>
  await api.post("/user/users", { email, friendsIds });

export const getUserFriends = async (email) =>
  await api.get(`/user/userFriends/${email}`);

export const getUserRequests = async (email) =>
  await api.get(`/user/userRequests/${email}`);

export const sendFriendRequest = async (userId, friendId) =>
  await api.post("/user/sendFriendRequest", { userId, friendId });

export const confirmFriendRequest = async (userId, friendId) =>
  await api.post("/user/confirmFriendRequest", { userId, friendId });

export const removeFriend = async (userId, friendId) =>
  await api.post("/user/removeFriend", { userId, friendId });

export const cancelFriendRequest = async (userId, friendId) =>
  await api.post("/user/cancelFriendRequest", { userId, friendId });
