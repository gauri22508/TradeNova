const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
        if (error) {
            return res.json({ status: false });
        }

        const user = await User.findById(data.id).select("username");
        return user
            ? res.json({ status: true, user: user.username })
            : res.json({ status: false });
    });
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (error, data) => {
        if (error) {
            return res.status(401).json({ message: "Authentication required" });
        }

        req.userId = data.id;
        next();
    });
};
