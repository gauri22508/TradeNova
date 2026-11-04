const express = require("express");

const router = express.Router();
const { Signup, Login, Logout } = require("../controllers/AuthController");
const { userVerification } = require("../middelwares/AuthMiddelwares");


router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verify", userVerification);

module.exports = router;
