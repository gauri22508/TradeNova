const express = require("express");
const { requireAuth } = require("../middelwares/AuthMiddelwares");

const router = express.Router();

const {
  getAllPositions,
} = require("../controllers/positionsController");

router.get("/allPositions", requireAuth, getAllPositions);

module.exports = router;