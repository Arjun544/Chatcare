const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/auh_middleware");

const {
  allUsers,
  userFriends,
  userRequests,
  sendFriendRequest,
  cancelFriendRequest,
  confirmFriendRequest,
  removeFriend,
} = require("../controllers/user_controller");

router.get("/userFriends/:email", authMiddleware, userFriends);
router.get("/userRequests/:email", authMiddleware, userRequests);
router.post("/users", authMiddleware, allUsers);
router.post("/sendFriendRequest", authMiddleware, sendFriendRequest);
router.post("/confirmFriendRequest", authMiddleware, confirmFriendRequest);
router.post("/removeFriend", authMiddleware, removeFriend);
router.post("/cancelFriendRequest", authMiddleware, cancelFriendRequest);

module.exports = router;
