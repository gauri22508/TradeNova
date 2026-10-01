const express = require("express");

const router = express.Router();
const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middelwares/AuthMiddelwares");


router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify", userVerification);

module.exports = router;
