const mongoose = require("mongoose");
const User = require("../models/UserModel");
const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");
const { OrdersModel } = require("../models/OrdersModel");

const INITIAL_BALANCE = 100000;
const BALANCE_FIELDS = ["initialBalance", "availableBalance", "usedBalance"];

const roundMoney = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

const ensureUserBalance = async (userId, session) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const queryOptions = {
    projection: Object.fromEntries(BALANCE_FIELDS.map((field) => [field, 1])),
    ...(session ? { session } : {}),
  };
  let user = await User.collection.findOne({ _id: objectId }, queryOptions);

  if (!user) {
    const error = new Error("User account not found");
    error.statusCode = 404;
    throw error;
  }

  for (const field of BALANCE_FIELDS) {
    if (user[field] !== undefined && !Number.isFinite(user[field])) {
      throw new Error("Invalid account balance data");
    }
  }

  const missingFields = BALANCE_FIELDS.filter((field) => user[field] === undefined);

  if (missingFields.length) {
    let usedBalance = user.usedBalance;

    if (usedBalance === undefined) {
      const holdingsQuery = HoldingsModel.find({ userId: objectId }).select("qty avg");
      if (session) holdingsQuery.session(session);
      const holdings = await holdingsQuery;
      usedBalance = roundMoney(
        holdings.reduce(
          (total, holding) => total + Number(holding.qty || 0) * Number(holding.avg || 0),
          0
        )
      );
    }

    let initialBalance = user.initialBalance;
    if (initialBalance === undefined) {
      initialBalance = Math.max(
        INITIAL_BALANCE,
        usedBalance + (user.availableBalance || 0)
      );
    }

    const availableBalance =
      user.availableBalance === undefined
        ? Math.max(0, roundMoney(initialBalance - usedBalance))
        : user.availableBalance;

    const values = { initialBalance, availableBalance, usedBalance };
    const fieldsToSet = Object.fromEntries(
      missingFields.map((field) => [field, values[field]])
    );
    const missingConditions = Object.fromEntries(
      missingFields.map((field) => [field, { $exists: false }])
    );

    await User.updateOne(
      { _id: objectId, ...missingConditions },
      { $set: fieldsToSet },
      session ? { session } : {}
    );
    user = await User.collection.findOne({ _id: objectId }, queryOptions);
  }

  if (BALANCE_FIELDS.some((field) => !Number.isFinite(user[field]))) {
    throw new Error("Unable to initialize account balance");
  }

  return user;
};

const getBalance = async (req, res) => {
  try {
    const balance = await ensureUserBalance(req.userId);
    res.json({
      initialBalance: balance.initialBalance,
      availableBalance: balance.availableBalance,
      usedBalance: balance.usedBalance,
      totalBalance: roundMoney(balance.availableBalance + balance.usedBalance),
    });
  } catch (err) {
    console.error("Error fetching balance:", err);
    res.status(err.statusCode || 500).json({
      error: err.statusCode ? err.message : "Failed to fetch account balance",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });
    const balances = new Map();
    const ordersWithProfitLoss = orders.map((order) => {
      const quantity = Number(order.qty);
      const price = Number(order.price);
      const balance = balances.get(order.name) || { qty: 0, avg: 0 };
      let realizedPnL =
        order.realizedPnL == null ? NaN : Number(order.realizedPnL);

      if (order.mode === "BUY") {
        const nextQuantity = balance.qty + quantity;
        balance.avg = (balance.qty * balance.avg + quantity * price) / nextQuantity;
        balance.qty = nextQuantity;
      } else if (order.mode === "SELL") {
        if (!Number.isFinite(realizedPnL)) {
          realizedPnL = roundMoney(
            (price - balance.avg) * Math.min(quantity, balance.qty)
          );
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
  const { name, qty, price, marketPrice, mode } = req.body || {};
  const quantity = Number(qty);
  const orderPrice = Number(price);
  const currentMarketPrice = marketPrice === undefined ? orderPrice : Number(marketPrice);

  if (
    typeof name !== "string" ||
    !/^[A-Za-z0-9.&_-]{1,30}$/.test(name.trim()) ||
    !Number.isSafeInteger(quantity) ||
    !Number.isFinite(orderPrice) ||
    !Number.isFinite(currentMarketPrice)
  ) {
    return res.status(400).json({ error: "Invalid stock symbol, quantity, or price" });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be greater than 0" });
  }

  if (orderPrice < 0.01 || currentMarketPrice < 0.01) {
    return res.status(400).json({ error: "Price must be at least 0.01" });
  }

  if (mode !== "BUY" && mode !== "SELL") {
    return res.status(400).json({ error: "Invalid order mode" });
  }

  const stockName = name.trim();
  const amount = roundMoney(quantity * orderPrice);
  if (!Number.isFinite(amount)) {
    return res.status(400).json({ error: "Order value is too large" });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    await ensureUserBalance(req.userId, session);

    const holding = await HoldingsModel.findOne({
      name: stockName,
      userId: userObjectId,
    }).session(session);
    let position = await PositionsModel.findOne({
      name: stockName,
      userId: userObjectId,
    }).session(session);
    let realizedPnL;

    if (mode === "BUY") {
      const balanceUpdate = await User.updateOne(
        {
          _id: userObjectId,
          availableBalance: { $gte: amount },
          usedBalance: { $gte: 0 },
        },
        { $inc: { availableBalance: -amount, usedBalance: amount } },
        { session }
      );

      if (balanceUpdate.matchedCount !== 1) {
        const error = new Error("Insufficient available balance");
        error.statusCode = 400;
        throw error;
      }

      let updatedHolding;
      if (holding) {
        const newQty = holding.qty + quantity;
        const newAvg = (holding.qty * holding.avg + quantity * orderPrice) / newQty;
        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = currentMarketPrice;
        holding.net = `${(((currentMarketPrice - newAvg) / newAvg) * 100).toFixed(2)}%`;
        updatedHolding = await holding.save({ session });
      } else {
        updatedHolding = new HoldingsModel({
          userId: userObjectId,
          name: stockName,
          qty: quantity,
          avg: orderPrice,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - orderPrice) / orderPrice) * 100).toFixed(2)}%`,
          day: "0%",
        });
        await updatedHolding.save({ session });
      }

      if (position) {
        position.avg = updatedHolding.avg;
        position.qty = updatedHolding.qty;
        position.price = currentMarketPrice;
        position.net = `${(((currentMarketPrice - position.avg) / position.avg) * 100).toFixed(2)}%`;
        position.isLoss = currentMarketPrice < position.avg;
        await position.save({ session });
      } else {
        position = new PositionsModel({
          userId: userObjectId,
          product: "CNC",
          name: stockName,
          qty: updatedHolding.qty,
          avg: updatedHolding.avg,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - updatedHolding.avg) / updatedHolding.avg) * 100).toFixed(2)}%`,
          day: "0%",
          isLoss: currentMarketPrice < updatedHolding.avg,
        });
        await position.save({ session });
      }
    } else {
      if (!holding) {
        const error = new Error("You don't own this stock");
        error.statusCode = 400;
        throw error;
      }

      const newQty = holding.qty - quantity;
      if (newQty < 0) {
        const error = new Error("Not enough quantity");
        error.statusCode = 400;
        throw error;
      }

      const costBasis = roundMoney(holding.avg * quantity);
      const balanceUpdate = await User.updateOne(
        {
          _id: userObjectId,
          availableBalance: { $gte: 0 },
          usedBalance: { $gte: costBasis },
        },
        { $inc: { availableBalance: amount, usedBalance: -costBasis } },
        { session }
      );

      if (balanceUpdate.matchedCount !== 1) {
        const error = new Error("Account balance does not cover this holding's cost basis");
        error.statusCode = 400;
        throw error;
      }

      realizedPnL = roundMoney((orderPrice - holding.avg) * quantity);
      if (newQty === 0) {
        await HoldingsModel.deleteOne(
          { _id: holding._id, userId: userObjectId },
          { session }
        );
      } else {
        holding.qty = newQty;
        holding.price = currentMarketPrice;
        holding.net = `${(((currentMarketPrice - holding.avg) / holding.avg) * 100).toFixed(2)}%`;
        await holding.save({ session });
      }

      if (position) {
        if (newQty === 0) {
          await PositionsModel.deleteOne(
            { _id: position._id, userId: userObjectId },
            { session }
          );
        } else {
          position.qty = newQty;
          position.avg = holding.avg;
          position.price = currentMarketPrice;
          position.net = `${(((currentMarketPrice - position.avg) / position.avg) * 100).toFixed(2)}%`;
          position.isLoss = currentMarketPrice < position.avg;
          await position.save({ session });
        }
      } else if (newQty > 0) {
        position = new PositionsModel({
          userId: userObjectId,
          product: "CNC",
          name: stockName,
          qty: newQty,
          avg: holding.avg,
          price: currentMarketPrice,
          net: `${(((currentMarketPrice - holding.avg) / holding.avg) * 100).toFixed(2)}%`,
          day: "0%",
          isLoss: currentMarketPrice < holding.avg,
        });
        await position.save({ session });
      }
    }

    const newOrder = new OrdersModel({
      userId: userObjectId,
      name: stockName,
      qty: quantity,
      price: orderPrice,
      marketPrice: currentMarketPrice,
      mode,
      ...(mode === "SELL" ? { realizedPnL } : {}),
    });
    await newOrder.save({ session });

    const updatedBalance = await User.collection.findOne(
      { _id: userObjectId },
      { session, projection: Object.fromEntries(BALANCE_FIELDS.map((field) => [field, 1])) }
    );
    await session.commitTransaction();

    res.json({
      message: "Order saved and portfolio updated",
      realizedPnL,
      balance: {
        ...updatedBalance,
        totalBalance: roundMoney(updatedBalance.availableBalance + updatedBalance.usedBalance),
      },
    });
  } catch (err) {
    if (session?.inTransaction()) {
      try {
        await session.abortTransaction();
      } catch (abortError) {
        console.error("Error aborting order transaction:", abortError);
      }
    }

    if (
      err.code === 20 ||
      err.codeName === "IllegalOperation" ||
      /Transaction numbers are only allowed|transactions are not supported|replica set/i.test(err.message)
    ) {
      return res.status(503).json({
        error: "MongoDB transactions are unavailable. Use an Atlas replica set or sharded cluster.",
      });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    console.error("Error saving order:", err);
    return res.status(500).json({ error: "Failed to save order" });
  } finally {
    if (session) await session.endSession();
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  getBalance,
};