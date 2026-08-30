require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { PositionsModel } = require("./model/PositionsModel");

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//     let tempHoldings=[
//        {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];
// tempHoldings.forEach(async (item) => {
//     const newHolding = new HoldingsModel({
//     name : item.name,
//     qty : item.qty,
//     avg: item.avg,
//     price:item.price,
//     net:item.net,
//     day:item.day,
//     });
//     await newHolding.save();
//   });
//   res.send("Holdings added successfully");
// });
// app.get("/addPositions", async (req, res) => {
//     const tempPositions=[
//         {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//     ];

//     tempPositions.forEach(async (item) => {
//         const newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price:item.price,
//             net:item.net,
//             day:item.day,
//         });
//         await newPosition.save();
//     });
//     res.send("Positions added successfully");
// });


// Get all Holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.log("Error fetching holdings:", err);
    res.status(500).json({
      error: "Failed to fetch holdings",
    });
  }
});


// Get all Positions
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.log("Error fetching positions:", err);
    res.status(500).json({
      error: "Failed to fetch positions",
    });
  }
});

app.post("/addOrder", async (req, res) => {
  try {

    const { name, qty, price, mode } = req.body;

    console.log("ORDER DATA:", req.body);

    const newOrder = new OrdersModel({
      name,
      qty: Number(qty),
      price: Number(price),
      mode,
    });

    await newOrder.save();

    const holding = await HoldingsModel.findOne({
      name: name
    });

    console.log("FOUND HOLDING:", holding);

    console.log("MODE:", mode);

    // BUY
    if (mode === "BUY") {

      if (holding) {

        console.log("BUY: Existing holding found");

        const oldQty = holding.qty;
        const oldAvg = holding.avg;

        const newQty = oldQty + Number(qty);

        const newAvg =
          ((oldQty * oldAvg) +
          (Number(qty) * Number(price))) / newQty;

        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = Number(price);

        await holding.save();

        console.log("UPDATED HOLDING:", holding);

      } else {

        console.log("BUY: Holding not found, creating new");

        const newHolding = new HoldingsModel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "0%",
          day: "0%",
        });

        await newHolding.save();

        console.log("NEW HOLDING:", newHolding);
      }
    }

    // SELL
    if (mode === "SELL") {

      console.log("SELL requested");

      if (!holding) {
        return res.status(400).send("You don't own this stock");
      }

      const newQty = holding.qty - Number(qty);

      if (newQty < 0) {
        return res.status(400).send("Not enough quantity");
      }

      if (newQty === 0) {

        await HoldingsModel.deleteOne({
          name: name
        });

      } else {

        holding.qty = newQty;
        holding.price = Number(price);

        await holding.save();
      }
    }

    res.send("Order saved and holding updated");

  } catch (err) {

    console.log("ERROR:", err);

    res.status(500).send("Failed");
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB connection error:", err);
    });
});

