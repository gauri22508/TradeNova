const express = require("express");

const router = express.Router();

const {
  addOrder,
} = require("../controllers/ordersController");

router.post("/addOrder", addOrder);

module.exports = router;