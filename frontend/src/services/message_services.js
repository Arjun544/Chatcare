import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendMessage = async (
  text,
  attachments,
  receiverId,
  senderId,
  conversationId
) =>
  await api.post("/message/send", {
    text,
    attachments,
    receiverId,
    senderId,
    conversationId,
  });

  export const addReact = async (msgId, react, userId) =>
    await api.post("/message/react", {
      msgId,
      react,
      userId,
    });
