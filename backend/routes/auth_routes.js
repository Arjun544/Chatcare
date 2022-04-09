const express = require("express");
const router = express.Router();

const {
  register,
  activate,
  login,
  forgotPassword,
  sendCode,
  resetPassword,
  refresh,
  logout,
  gmailLogin,
  gmailSignup,
} = require("../controllers/auth_controller");

router.get("/refresh", refresh);
router.post("/register", register);
router.post("/activate", activate);
router.post("/login", login);
router.post("/gmailLogin", gmailLogin);
router.post("/gmailSignup", gmailSignup);
router.post("/forgetPassword", forgotPassword);
router.post("/sendCode", sendCode);
router.post("/reset", resetPassword);
router.post("/logout", logout);

module.exports = router;
