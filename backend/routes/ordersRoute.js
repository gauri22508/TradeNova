const express = require("express");
const { requireAuth } = require("../middelwares/AuthMiddelwares");

const router = express.Router();

const {
  getAllOrders,
  addOrder,
  getBalance,
} = require("../controllers/ordersController");

router.get("/allOrders", requireAuth, getAllOrders);
router.get("/balance", requireAuth, getBalance);
router.post("/addOrder", requireAuth, addOrder);

module.exports = router;