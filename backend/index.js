require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
    console.log("server started");

    mongoose.connect(process.env.MONGO_URL, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    })
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("db connection error", err);
    });
});