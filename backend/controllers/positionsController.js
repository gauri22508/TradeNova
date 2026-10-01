const { PositionsModel } = require("../models/PositionsModel");
const { getOpenOrderBalances } = require("../Util/OrderBalances");
const { claimLegacyRecords } = require("../Util/LegacyRecords");

const getAllPositions = async (req, res) => {
  try {
    await claimLegacyRecords(PositionsModel, req.userId);
    const existingPositions = await PositionsModel.find({ userId: req.userId }).select("name");
    const existingNames = new Set(existingPositions.map((position) => position.name));
    const missingPositions = (await getOpenOrderBalances(req.userId))
      .filter((balance) => !existingNames.has(balance.name))
      .map((balance) => ({
        ...balance,
        userId: req.userId,
        product: "CNC",
        net: "0%",
        day: "0%",
        isLoss: balance.price < balance.avg,
      }));

    if (missingPositions.length) {
      await PositionsModel.insertMany(missingPositions);
    }

    const allPositions = await PositionsModel.find({ userId: req.userId });
    res.json(allPositions);
  } catch (err) {
    console.log("Error fetching positions:", err);

    res.status(500).json({
      error: "Failed to fetch positions",
    });
  }
};

module.exports = {
  getAllPositions,
};