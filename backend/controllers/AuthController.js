const User = require("../models/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const user = await User.create({ email, password, username });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(201).json({
            message: "User signed in successfully",
            success: true,
            user,
        });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Signup failed" });
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        if (!email.includes("@")) {
            return res.json({ message: "Email not valid" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.json({ message: "Invalid password" });
        }
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};