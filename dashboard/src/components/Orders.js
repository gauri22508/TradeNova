import { useState, useEffect } from "react";
import "./Shared.css";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:3002/allOrders", { withCredentials: true })
        .then((res) => setAllOrders(res.data))
        .catch((err) => console.error("Error fetching Orders:", err));
    };

    fetchOrders();
    window.addEventListener("trade:updated", fetchOrders);
    return () => window.removeEventListener("trade:updated", fetchOrders);
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>QTY.</th>
              <th>PRICE</th>
              <th>MODE</th>
              <th>REALIZED P&amp;L</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((stock) => {
              const realizedPnL = Number(stock.realizedPnL);
              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{stock.mode}</td>
                  <td className={realizedPnL >= 0 ? "profit" : "loss"}>
                    {stock.mode === "SELL" && Number.isFinite(realizedPnL)
                      ? realizedPnL.toFixed(2)
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default Orders;