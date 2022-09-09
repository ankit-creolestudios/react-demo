const express = require("express");
const {
  register,
  signIn,
  signOut,
  forgetPassword,
} = require("../controller/userController");
const Emailhandler = require("../controller/email");
const router = express.Router();

router.post("/register", register);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.post("/email", Emailhandler);
router.post("/forget-password", forgetPassword);
module.exports = router;
