const { OrdersModel } = require("../models/OrdersModel");

const getOpenOrderBalances = async (userId) => {
    const orders = await OrdersModel.find({ userId }).sort({ _id: 1 });
    const balances = new Map();

    for (const order of orders) {
        const quantity = Number(order.qty);
        const price = Number(order.price);

        if (!order.name || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(price) || price <= 0) {
            continue;
        }

        const balance = balances.get(order.name) || {
            name: order.name,
            qty: 0,
            avg: 0,
            price,
        };

        if (order.mode === "BUY") {
            const nextQuantity = balance.qty + quantity;
            balance.avg = (balance.qty * balance.avg + quantity * price) / nextQuantity;
            balance.qty = nextQuantity;
            balance.price = price;
        } else if (order.mode === "SELL") {
            balance.qty = Math.max(0, balance.qty - quantity);
            balance.price = price;
        }

        balances.set(order.name, balance);
    }

    return [...balances.values()].filter((balance) => balance.qty > 0);
};

module.exports = { getOpenOrderBalances };