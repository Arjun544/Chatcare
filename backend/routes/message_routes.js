const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  sendMessage,
} = require("../controllers/message_controller");

router.post("/send", authMiddleware, sendMessage);

module.exports = router;
