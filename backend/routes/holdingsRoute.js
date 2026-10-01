const express = require("express");
const { requireAuth } = require("../middelwares/AuthMiddelwares");

const router = express.Router();

const {
  getAllHoldings,
} = require("../controllers/holdingsController");

router.get("/allHoldings", requireAuth, getAllHoldings);

module.exports = router;