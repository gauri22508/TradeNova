const { HoldingsModel } = require("../models/HoldingsModel");
const { getOpenOrderBalances } = require("../Util/OrderBalances");
const { claimLegacyRecords } = require("../Util/LegacyRecords");

const getAllHoldings = async (req, res) => {
  try {
    await claimLegacyRecords(HoldingsModel, req.userId);
    const existingHoldings = await HoldingsModel.find({ userId: req.userId }).select("name");
    const existingNames = new Set(existingHoldings.map((holding) => holding.name));
    const missingHoldings = (await getOpenOrderBalances(req.userId))
      .filter((balance) => !existingNames.has(balance.name))
      .map((balance) => ({
        ...balance,
        userId: req.userId,
        net: "0%",
        day: "0%",
      }));

    if (missingHoldings.length) {
      await HoldingsModel.insertMany(missingHoldings);
    }

    const allHoldings = await HoldingsModel.find({ userId: req.userId });
    res.json(allHoldings);
  } catch (err) {
    console.log("Error fetching holdings:", err);

    res.status(500).json({
      error: "Failed to fetch holdings",
    });
  }
};

module.exports = {
  getAllHoldings,
};