const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  getUserConversations,
  createConversation,
  getConversationMsgs,
  getConversationAttachments,
} = require("../controllers/conversation_controller");

router.post("/create", authMiddleware, createConversation);
router.get("/get/:userId", authMiddleware, getUserConversations);
router.get("/messages/:conversationId", authMiddleware, getConversationMsgs);
router.get(
  "/attachments/:conversationId",
  authMiddleware,
  getConversationAttachments
);

module.exports = router;
