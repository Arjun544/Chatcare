const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");
const upload = require("../config/cloudinary");

const { sendMessage, addReact } = require("../controllers/message_controller");

router.post("/send", upload.array("fileUrls"), authMiddleware, sendMessage);
router.post("/react", authMiddleware, addReact);

module.exports = router;
