const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  getUserConversations,
  createConversation,
  getConversationMsgs,
  getConversationImages,
} = require("../controllers/conversation_controller");

router.post("/create", authMiddleware, createConversation);
router.get("/get/:userId", authMiddleware, getUserConversations);
router.get("/messages/:conversationId", authMiddleware, getConversationMsgs);
router.get("/images/:conversationId", authMiddleware, getConversationImages);

module.exports = router;
