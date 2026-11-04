const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0.01 },
  marketPrice: Number,
  mode: { type: String, required: true, enum: ["BUY", "SELL"] },
  realizedPnL: Number,
});

module.exports = { OrdersSchema };