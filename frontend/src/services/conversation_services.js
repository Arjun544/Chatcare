import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const createConversation = async (byId, toId, message, attachments) =>
  await api.post("/conversation/create", { byId, toId, message, attachments });

export const getConversations = async (userId) =>
  await api.get(`/conversation/get/${userId}`);

export const getConversationMessages = async (conversationId) =>
  await api.get(`/conversation/messages/${conversationId}`);

export const getConversationImages = async (conversationId) =>
  await api.get(`/conversation/images/${conversationId}`);
