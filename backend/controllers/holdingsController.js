const { HoldingsModel } = require("../model/HoldingsModel");

const getAllHoldings = async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
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