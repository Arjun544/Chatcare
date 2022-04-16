const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  allUsers,
  sendFriendRequest,
  cancelFriendRequest,
} = require("../controllers/user_controller");

router.get("/users/:email", authMiddleware, allUsers);
router.post("/sendFriendRequest", authMiddleware, sendFriendRequest);
router.post("/cancelFriendRequest", authMiddleware, cancelFriendRequest);

module.exports = router;
