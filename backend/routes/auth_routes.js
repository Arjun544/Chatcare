const express = require("express");
const router = express.Router();

const {
  register,
  activate,
  login,
  forgotPassword,
  sendCode,
  resetPassword,
} = require("../controllers/auth_controller");

router.post("/register", register);
router.post("/activate", activate);
router.post("/login", login);
router.post("/forgetPassword", forgotPassword);
router.post("/sendCode", sendCode);
router.post("/reset", resetPassword);

module.exports = router;
