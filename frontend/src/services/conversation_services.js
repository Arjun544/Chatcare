import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const createConversation = async (byId, toId, message) =>
  await api.post("/conversation/create", { byId, toId, message });

export const getConversations = async (userId) =>
  await api.get(`/conversation/get/${userId}`);
