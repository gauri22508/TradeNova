const { PositionsModel } = require("../model/PositionsModel");

const getAllPositions = async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
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