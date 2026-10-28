const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");
const { OrdersModel } = require("../models/OrdersModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });
    const balances = new Map();
    const ordersWithProfitLoss = orders.map((order) => {
      const quantity = Number(order.qty);
      const price = Number(order.price);
      const balance = balances.get(order.name) || { qty: 0, avg: 0 };
      let realizedPnL = Number(order.realizedPnL);

      if (order.mode === "BUY") {
        const nextQuantity = balance.qty + quantity;
        balance.avg = (balance.qty * balance.avg + quantity * price) / nextQuantity;
        balance.qty = nextQuantity;
      } else if (order.mode === "SELL") {
        if (!Number.isFinite(realizedPnL)) {
          realizedPnL = (price - balance.avg) * Math.min(quantity, balance.qty);
        }
        balance.qty = Math.max(0, balance.qty - quantity);
        if (balance.qty === 0) balance.avg = 0;
      }

      balances.set(order.name, balance);
      return {
        ...order.toObject(),
        realizedPnL: order.mode === "SELL" ? realizedPnL : null,
      };
    });

    res.json(ordersWithProfitLoss.reverse());
  } catch (err) {
    console.log("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const addOrder = async (req, res) => {
  try {
    const { name, qty, price, marketPrice, mode } = req.body;

    const quantity = Number(qty);
    const orderPrice = Number(price);
    const currentMarketPrice =
      marketPrice === undefined ? orderPrice : Number(marketPrice);

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(quantity) ||
      !Number.isFinite(orderPrice) ||
      !Number.isFinite(currentMarketPrice) ||
      !mode
    ) {
      return res.status(400).json({
        error: "Missing required order details",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        error: "Quantity must be greater than 0",
      });
    }

    if (orderPrice <= 0 || currentMarketPrice <= 0) {
      return res.status(400).json({
        error: "Price must be greater than 0",
      });
    }

    if (mode !== "BUY" && mode !== "SELL") {
      return res.status(400).json({
        error: "Invalid order mode",
      });
    }

    const stockName = name.trim();
    const holding = await HoldingsModel.findOne({ name: stockName, userId: req.userId });
    let position = await PositionsModel.findOne({ name: stockName, userId: req.userId });
    let realizedPnL;

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({ error: "You don't own this stock" });
      }

      const newQty = holding.qty - quantity;

      if (newQty < 0) {
        return res.status(400).json({ error: "Not enough quantity" });
      }

      realizedPnL = (orderPrice - holding.avg) * quantity;
      if (newQty === 0) {
        await HoldingsModel.deleteOne({
          name: stockName,
          userId: req.userId,
        });
      } else {
        holding.qty = newQty;
        holding.price = currentMarketPrice;
        holding.net = `${(((currentMarketPrice - holding.avg) / holding.avg) * 100).toFixed(2)}%`;
        await holding.save();
      }

      if (position) {
        if (newQty === 0) {
          await PositionsModel.deleteOne({ _id: position._id });
        } else {
          position.qty = newQty;
          position.avg = holding.avg;
          position.price = currentMarketPrice;
          position.net = `${(((currentMarketPrice - position.avg) / position.avg) * 100).toFixed(2)}%`;
          position.isLoss = currentMarketPrice < position.avg;
          await position.save();
        }
      } else if (newQty > 0) {
        position = await PositionsModel.create({
          userId: req.userId,
          product: "CNC",
          name: stockName,
          qty: newQty,
          avg: holding.avg,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - holding.avg) / holding.avg) * 100).toFixed(2)}%`,
          day: "0%",
          isLoss: currentMarketPrice < holding.avg,
        });
      }
    }

    if (mode === "BUY") {
      let updatedHolding;

      if (holding) {
        const oldQty = holding.qty;
        const oldAvg = holding.avg;
        const newQty = oldQty + quantity;
        const newAvg = (oldQty * oldAvg + quantity * orderPrice) / newQty;
        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = currentMarketPrice;
        holding.net = `${(((currentMarketPrice - newAvg) / newAvg) * 100).toFixed(2)}%`;
        updatedHolding = await holding.save();
      } else {
        const newAvg = orderPrice;
        updatedHolding = await HoldingsModel.create({
          userId: req.userId,
          name: stockName,
          qty: quantity,
          avg: newAvg,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - newAvg) / newAvg) * 100).toFixed(2)}%`,
          day: "0%",
        });
      }

      if (position) {
        position.avg = updatedHolding.avg;
        position.qty = updatedHolding.qty;
        position.price = currentMarketPrice;
        position.net = `${(((currentMarketPrice - position.avg) / position.avg) * 100).toFixed(2)}%`;
        position.isLoss = currentMarketPrice < position.avg;
        await position.save();
      } else {
        await PositionsModel.create({
          userId: req.userId,
          product: "CNC",
          name: stockName,
          qty: updatedHolding.qty,
          avg: updatedHolding.avg,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - updatedHolding.avg) / updatedHolding.avg) * 100).toFixed(2)}%`,
          day: "0%",
          isLoss: currentMarketPrice < updatedHolding.avg,
        });
      }
    }

    const newOrder = new OrdersModel({
      userId: req.userId,
      name: stockName,
      qty: quantity,
      price: orderPrice,
      marketPrice: currentMarketPrice,
      mode: mode,
      ...(mode === "SELL" ? { realizedPnL } : {}),
    });

    await newOrder.save();

    res.json({ message: "Order saved and portfolio updated", realizedPnL });

  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
};

module.exports = {
  getAllOrders,
  addOrder,
};