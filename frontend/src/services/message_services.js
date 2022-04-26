import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendMessage = async (text, receiverId, senderId, conversationId) =>
  await api.post("/message/send", {
    text,
    receiverId,
    senderId,
    conversationId,
  });
