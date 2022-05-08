const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");
const upload = require("../config/cloudinary");

const { sendMessage } = require("../controllers/message_controller");

router.post("/send", upload.array("fileUrls"), authMiddleware, sendMessage);

module.exports = router;
