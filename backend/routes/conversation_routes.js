const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  getUserConversations,
  createConversation,
} = require("../controllers/conversation_controller");

router.post("/create", authMiddleware, createConversation);
router.get("/get/:userId", authMiddleware, getUserConversations);

module.exports = router;
