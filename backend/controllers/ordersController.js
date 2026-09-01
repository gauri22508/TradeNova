const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");

const addOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    console.log("ORDER DATA:", req.body);

    const quantity = Number(qty);
    const orderPrice = Number(price);

    // Basic validation
    if (!name || !quantity || !orderPrice || !mode) {
      return res.status(400).json({
        error: "Missing required order details",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        error: "Quantity must be greater than 0",
      });
    }

    if (orderPrice <= 0) {
      return res.status(400).json({
        error: "Price must be greater than 0",
      });
    }

    if (mode !== "BUY" && mode !== "SELL") {
      return res.status(400).json({
        error: "Invalid order mode",
      });
    }

    const holding = await HoldingsModel.findOne({
      name: name,
    });

    console.log("FOUND HOLDING:", holding);
    console.log("MODE:", mode);

    
    // SELL
    // =========================

    if (mode === "SELL") {
      console.log("SELL requested");

      if (!holding) {
        return res.status(400).send("You don't own this stock");
      }

      const newQty = holding.qty - quantity;

      if (newQty < 0) {
        return res.status(400).send("Not enough quantity");
      }

      if (newQty === 0) {
        await HoldingsModel.deleteOne({
          name: name,
        });
      } else {
        holding.qty = newQty;
        holding.price = orderPrice;

        await holding.save();
      }
    }

  
    // BUY
    // =========================

    if (mode === "BUY") {
      if (holding) {
        console.log("BUY: Existing holding found");

        const oldQty = holding.qty;
        const oldAvg = holding.avg;

        const newQty = oldQty + quantity;

        const newAvg =
          (oldQty * oldAvg + quantity * orderPrice) / newQty;

        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = orderPrice;

        await holding.save();

        console.log("UPDATED HOLDING:", holding);
      } else {
        console.log("BUY: Holding not found, creating new");

        const newHolding = new HoldingsModel({
          name: name,
          qty: quantity,
          avg: orderPrice,
          price: orderPrice,
          net: "0%",
          day: "0%",
        });

        await newHolding.save();

        console.log("NEW HOLDING:", newHolding);
      }
    }

    // Save order only after BUY/SELL operation succeeds
    const newOrder = new OrdersModel({
      name: name,
      qty: quantity,
      price: orderPrice,
      mode: mode,
    });

    await newOrder.save();

    res.send("Order saved and holding updated");

  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).send("Failed");
  }
};

module.exports = {
  addOrder,
};