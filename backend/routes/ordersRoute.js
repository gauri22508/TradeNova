const express = require("express");
const { requireAuth } = require("../middelwares/AuthMiddelwares");

const router = express.Router();

const {
  getAllOrders,
  addOrder,
} = require("../controllers/ordersController");

router.get("/allOrders", requireAuth, getAllOrders);
router.post("/addOrder", requireAuth, addOrder);

module.exports = router;